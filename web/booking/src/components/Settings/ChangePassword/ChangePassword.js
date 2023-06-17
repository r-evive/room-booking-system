import { Fade, MenuItem, Modal } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UpdateResource, UploadImage, UploadResource } from '../../../api/Resources';
import { ChangeUserPassword, Register, UpdateUser } from '../../../api/UserRequests';
import { UserSession } from '../../../Context/UserSession';
import { BoxStyled, StyledButton, Content, Footer, StyledBox, StyledTextField, Title, FileUploadContainer, FileUploadTextField, FileUploadButton, Error } from './ChangePassword.styled'

const ChangePassword = (props) => {
	const isMounted = useRef(true);
	const {userSession, setUserSesssion} = useContext(UserSession);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState({password: false, confirm_password: false});
	const navigate = useNavigate();

	const handlePasswordChange = (event) =>{
		setErrors({...errors, password: false, confirm_password: false});
		if(event.target.value.length < 50)
			setPassword(event.target.value);
	}

	const handleConfirmPasswordChange = (event) =>{
		setErrors({...errors, password: false, confirm_password: false});
		if(event.target.value.length < 50)
			setConfirmPassword(event.target.value);
	}

	const validateForm = () =>{
		let errors = {password: false, confirm_password: false};

		if(!password)
			errors.password = true;
		else if(!confirmPassword)
			errors.confirm_password = true;
		else if(password != confirmPassword)
			errors = {password: true, confirm_password: true};

		setErrors(errors);

		return Object.keys(errors)?.filter(error => errors[error] === true)?.length == 0;
	}

	const handleSubmit = async () => {
		setErrors({password: false, confirm_password: false});
		if(validateForm()){
			let dataForm = {
				password: password,
			}
	
				await updateUserPassword({...dataForm});
		}
		else{
			console.log('Validation fail', errors);
		}
	};

	const updateUserPassword = async(user) => {
		if(!user){
			console.log('Error updating user password');
			return;
		}

		let result = await ChangeUserPassword(userSession?.user?.token, {...user, id: props?.editingUser?.id});
        if(isMounted.current && result.status === 'OK'){
			console.log('User updated successfully');
			props.handleClose();
        }
        else{
            console.log(result);
			console.log('An error has occured while adding user');
        }
	}
	
	const hasErrorOccurred = () => {
		if(errors?.password && errors?.confirm_password)
			return <Error>The passwords are not the same!</Error>
		else if(errors?.password)
			return <Error>Enter the correct password!</Error>
		else if(errors?.confirm_password)
			return <Error>Confirm your password!</Error>
		else
			return null;
	}

	useEffect(() =>{
		isMounted.current = true;

		return () => {
			isMounted.current = false;
		}
	}, []);

	return (
		<Modal open={props.isOpen} onClose={props.handleClose} closeAfterTransition>
			<Fade in={props.isOpen} >
				<BoxStyled>
				<Content>
					<Title>Change password</Title>
					<StyledBox component="form" sx={{}}>
						<StyledTextField required id="password" label="Password" size="small" error={errors.password} value={password ?? ''} type='password' onChange={handlePasswordChange}/>
						<StyledTextField required id="password" label="Confirm password" size="small" error={errors.confirm_password} value={confirmPassword ?? ''} type='password' onChange={handleConfirmPasswordChange}/>
						{hasErrorOccurred()}
					</StyledBox>
				</Content>
				<Footer>
						<StyledButton variant="outlined" size="medium" onClick={props.handleClose}>Cancel</StyledButton>
						<StyledButton onClick={handleSubmit} variant="contained" size="medium">Change</StyledButton>
				</Footer>
				</BoxStyled>
			</Fade>
		</Modal>
	)
}

export default ChangePassword