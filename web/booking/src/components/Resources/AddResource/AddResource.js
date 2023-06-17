import { Fade, MenuItem, Modal } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GetEquipment, getRoomEquipment, UpdateResource, UploadImage, UploadResource } from '../../../api/Resources';
import { UserSession } from '../../../Context/UserSession';
import { BoxStyled, StyledButton, Content, Footer, StyledBox, StyledTextField, Title, FileUploadContainer, FileUploadTextField, FileUploadButton, EquipmentItem, EquipmentContainer, EquipmentImage, EquipmentName } from './AddResource.styled'

const AddResource = (props) => {
	const isMounted = useRef(true);
	const {userSession, setUserSession} = useContext(UserSession);
	const [type, setType] = useState('Room');
	const [capacity, setCapacity] = useState(1);
	const [name, setName] = useState('');
	const [selectedFile, setSelectedFile] = useState(null);
	const [isSelected, setIsSelected] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [errors, setErrors] = useState({type: false, capacity: false, name: false, file: false});
	const [possibleEquipment, setPossibleEquipment] = useState([]);
	const [selectedEquipment, setSelectedEquipment] = useState([]);
	const navigate = useNavigate();

	const Types = [
		{
			value: 'Room',
			label: 'Room'
		},
		{
			value: 'Equipment',
			label: 'Equipment'
		}
	]

	const handleTypeChange = (event) => {
		setType(event.target.value);
	}

	const handleNameChange = (event) =>{
		setErrors({...errors, name: false});
		if(event.target.value.length < 50)
			setName(event.target.value);
	}

	const handleCapacityChange = (event) => {
		setErrors({...errors, capacity: false});
		if(event.target.value && event.target.value.length < 4 && event.target.value.match('^[1-9]+[0-9]*$'))
			setCapacity(event.target.value);
	}

	const handleFileChange = (event) => {
		setErrors({...errors, file: false});
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	const validateForm = () =>{
		let errors = {type: false, capacity: false, name: false, file: false};

		if(!type)
			errors.type = true;
		if(!name)
			errors.name = true;
		if(type == 'Room' && !capacity)
			errors.capacity = true;
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
		setErrors({type: false, capacity: false, name: false, file: false});
		if(validateForm()){
			let dataForm = {
				type: type,
				name: name,
				file: selectedFile,
			}
			if(type == 'Room'){
				dataForm.capacity = capacity;
				dataForm.selectedEquipment = selectedEquipment;
			}
	
			let imageID = await uploadImage(selectedFile);

			if(isEditing){
				await updateData({...dataForm, image: imageID});
			}
			else{
				await uploadData({...dataForm, image: imageID});
			}
		}
	};

	const uploadData = async (resource) =>{
		if(!resource || !resource?.image){
			console.log('Error adding resource');
			return;
		}

		let result = await UploadResource(userSession?.user?.token, resource);
        if(isMounted.current && result.status === 'OK'){
			console.log('Resource added successfully');
			props.handleClose();
			props.refreshRooms();
			props.refreshEquipment();
        }
        else{
            console.log(result);
			console.log('Error adding resource');
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

	const updateData = async(resource) => {
		if(!resource || !resource?.image){
			console.log('Error updating resource');
			return;
		}

		let result = await UpdateResource(userSession?.user?.token, {...resource, id: props?.editingResource?.id});
        if(isMounted.current && result.status === 'OK'){
			console.log('Resource updated successfully');
			props.handleClose();
			props.refreshRooms();
			props.refreshEquipment();
        }
        else{
            console.log(result);
			console.log('Error updating resource');
        }
	}

	const getEquipmentList = async () => {
        if(!isMounted.current) return;
        
        let result = await GetEquipment(userSession?.user?.token);
        if(isMounted.current && result.status === 'OK'){
            setPossibleEquipment(result?.response?.equipment || []);
        }
        else{
            console.log(result);
        }
    }

	const isEquipmentSelected = (id) =>{
		if(!id) return false;
		return selectedEquipment.includes(id) ? true : false;
	}

	const generateEquipment = () => {
		return possibleEquipment?.map(equipment => <EquipmentItem key={`equipment_${equipment.id}`} onClick={() => handleEquipmentClick(equipment?.id)} selected={isEquipmentSelected(equipment?.id)}><EquipmentImage src={'http://localhost:3001/' + equipment.path.replace('\\','/')} /><EquipmentName>{equipment?.equipment_name}</EquipmentName></EquipmentItem>);
	}

	const handleEquipmentClick = (id) => {
		if(selectedEquipment.includes(id)){
			setSelectedEquipment(selectedEquipment.filter(equipment => equipment != id));
		}
		else{
			setSelectedEquipment([...selectedEquipment, id]);
		}
	}


	const getSelectedEquipment = async (roomID) => {
        if(!isMounted.current) return;
        
        let result = await getRoomEquipment(userSession?.user?.token, roomID);
        if(isMounted.current && result?.response?.status === 'OK'){
            setSelectedEquipment(result?.response?.equipment?.map(equipment => equipment.equipment_id).filter(equipment => equipment != null) || []);
        }
        else{
            console.log(result);
        }
	}

	useEffect(() =>{
		isMounted.current = true;

		if(props?.editingResource?.id)
		{
			if(props?.editingResource?.room_name != undefined){
				setName(props?.editingResource?.room_name || '');
				setCapacity(props?.editingResource?.capacity || 1);
				getSelectedEquipment(props?.editingResource?.id);
			}
			else if(props?.editingResource?.equipment_name != undefined){
				setName(props?.editingResource?.equipment_name || '');
				setType('Equipment');
			}

			setIsEditing(true);
		}

		getEquipmentList();

		return () => {
			isMounted.current = false;
		}
	}, []);

	return (
		<Modal open={props.isOpen} onClose={props.handleClose} closeAfterTransition>
			<Fade in={props.isOpen} >
				<BoxStyled>
				<Content>
					<Title>{isEditing ? 'Edit resource' : 'Add resource'}</Title>
					<StyledBox component="form" sx={{}}>
						<StyledTextField id="type" select label="Type" value={type} size="small" onChange={handleTypeChange} error={errors.type}>
							{Types.map((option) => (
								<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
							))}
						</StyledTextField>
						<StyledTextField required id="name" label="Name" size="small" error={errors.name} value={name ?? ''} onChange={handleNameChange}/>
							{(() => {
								if (type == 'Room'){
									return (
										<React.Fragment>
											<StyledTextField required id="capacity" label="Capacity" size="small" type="number" value={capacity} onChange={handleCapacityChange} error={errors.capacity}/>
										</React.Fragment>
									)
								}
								return null;
							})()}
							<FileUploadContainer>
								<FileUploadTextField id="file" label="Image" size="small" value={selectedFile?.name ?? 'Not selected'} disabled error={errors.file}/>
								<FileUploadButton variant="contained" component="label"> Upload image <input type="file" onChange={handleFileChange} hidden accept="image/*"/></FileUploadButton>
							</FileUploadContainer>
							{type === 'Room' ?<EquipmentContainer>{generateEquipment()}</EquipmentContainer> : null}
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

export default AddResource