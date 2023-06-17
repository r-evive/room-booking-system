import { Fade, MenuItem, Modal } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UpdateResource, UploadImage, UploadResource } from '../../../api/Resources';
import { Register, UpdateUser } from '../../../api/UserRequests';
import { UserSession } from '../../../Context/UserSession';
import { BoxStyled, StyledButton, Content, Footer, StyledBox, StyledTextField, Title, FileUploadContainer, FileUploadTextField, FileUploadButton } from './AddUser.styled'

const AddUser = (props) => {
	const isMounted = useRef(true);
	const {userSession, setUserSession} = useContext(UserSession);
	const [admin, setAdmin] = useState(false);
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [full_name, setFullName] = useState('');
	const [selectedFile, setSelectedFile] = useState(null);
	const [isSelected, setIsSelected] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [errors, setErrors] = useState({type: false, capacity: false, name: false, file: false});
	const navigate = useNavigate();

	const handleAdminChange = (event) => {
		setAdmin(event.target.value);
	}

	const handleLoginChange = (event) =>{
		setErrors({...errors, login: false});
		if(event.target.value.length < 50)
			setLogin(event.target.value);
	}

	const handlePasswordChange = (event) =>{
		setErrors({...errors, password: false});
		if(event.target.value.length < 50)
			setPassword(event.target.value);
	}
	const handleFullNameChange = (event) =>{
		setErrors({...errors, full_name: false});
		if(event.target.value.length < 50)
			setFullName(event.target.value);
	}

	const handleFileChange = (event) => {
		setErrors({...errors, file: false});
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	const validateForm = () =>{
		let errors = {login: false, password: false, full_name: false, file: false};

		if(!login)
			errors.login = true;
		if(!isEditing && !password)
			errors.password = true;
		if(!full_name)
			errors.full_name = true;
		if(!selectedFile)
			errors.file = true;
		
		let isValid = true;

		Object.keys(errors).forEach(error => {
			if(errors[error])
				isValid = false;
		});
		setErrors(errors);

		return isValid; 
	}

	const handleSubmit = async () => {
		setErrors({login: false, password: false, full_name: false, file: false});
		if(validateForm()){
			let dataForm = {
				login: login,
				password: password,
				full_name: full_name,
				is_admin: admin,
				file: selectedFile,
			}
	
			let imageID = await uploadImage(selectedFile);

			if(isEditing){
				await updateUserData({...dataForm, image: imageID});
			}
			else{
				await addUserData({...dataForm, image: imageID});
			}
		}
		else{
			console.log('Validation fail', errors);
		}
	};

	const addUserData = async (user) =>{
		if(!user || !user?.image){
			console.log('Error adding resource');
			return;
		}

		let result = await Register(user);
        if(isMounted.current && result.status === 'OK'){
			console.log('User added successfully');
			props.handleClose();
			props.refreshUsers();
        }
        else{
            console.log(result);
			console.log('An error has occured while adding user');
        }
	}

	const uploadImage = async (image) => {
		let formData = new FormData();
		formData.append('file', selectedFile);

		let result = await UploadImage(userSession?.user?.token, formData);
		if(isMounted.current && result.status === 'OK' && result?.response?.image_id){
			return result?.response?.image_id;
		}
		return null;
	}

	const updateUserData = async(user) => {
		console.log(user);
		if(!user|| !user?.image){
			console.log('Error updating resource');
			return;
		}

		let result = await UpdateUser(userSession?.user?.token, {...user, id: props?.editingUser?.id});
		console.log(result);
        if(isMounted.current && result.status === 'OK'){
			console.log('User updated successfully');
			props.handleClose();
			props.refreshUsers();
        }
        else{
            console.log(result);
			console.log('An error has occured while adding user');
        }
	}

	useEffect(() =>{
		isMounted.current = true;

		if(props?.editingUser?.id)
		{
			setLogin(props?.editingUser?.login || '');
			setFullName(props?.editingUser?.full_name || '');
			setAdmin(props?.editingUser?.is_admin || false);
			setIsEditing(true);
		}

		return () => {
			isMounted.current = false;
		}
	}, []);

	return (
		<Modal open={props.isOpen} onClose={props.handleClose} closeAfterTransition>
			<Fade in={props.isOpen} >
				<BoxStyled>
				<Content>
					<Title>{isEditing ? 'Edit user' : 'Add user'}</Title>
					<StyledBox component="form" sx={{}}>
					<StyledTextField required id="login" label="Login" size="small" error={errors.login} value={login ?? ''} onChange={handleLoginChange}/>
						{!isEditing ? <StyledTextField required id="password" label="Password" size="small" error={errors.password} value={password ?? ''} type='password' onChange={handlePasswordChange}/> : null}
						<StyledTextField required id="name" label="Full name" size="small" error={errors.full_name} value={full_name ?? ''} onChange={handleFullNameChange}/>
						{userSession?.user?.is_admin ? (
							<StyledTextField id="admin" select label="Admin" value={admin} size="small" onChange={handleAdminChange} error={errors.is_admin}>
								<MenuItem value={true}>Yes</MenuItem>
								<MenuItem value={false}>No</MenuItem>
						</StyledTextField>
						): null }
						<FileUploadContainer>
							<FileUploadTextField id="file" label="Avatar" size="small" value={selectedFile?.name ?? 'Not selected'} disabled error={errors.file}/>
							<FileUploadButton variant="contained" component="label"> Upload image <input type="file" onChange={handleFileChange} hidden accept="image/*"/></FileUploadButton>
						</FileUploadContainer>
					</StyledBox>
				</Content>
				<Footer>
						<StyledButton variant="outlined" size="medium" onClick={props.handleClose}>Cancel</StyledButton>
						<StyledButton onClick={handleSubmit} variant="contained" size="medium">{isEditing ? 'Save' : 'Add'}</StyledButton>
				</Footer>
				</BoxStyled>
			</Fade>
		</Modal>
	)
}

export default AddUser