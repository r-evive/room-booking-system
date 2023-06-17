import { Grid, Tooltip } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AvailabilityStatus, Content, Header, Image, Capacity, RoomName, Wrapper, CapacityValue, Equipment, EquipmentIcon } from './RoomItem.styled'
import GroupIcon from '@mui/icons-material/Group';
import BentoIcon from '@mui/icons-material/Bento';
import { UserSession } from '../../../Context/UserSession';
import { getRoomEquipment } from '../../../api/Resources';

const RoomItem = (props) => {
    const isMounted = useRef(true);
    const [equipment, setEquipment] = useState([]);
    const {userSession, setUserSession} = useContext(UserSession);


    const generateEquipment = () =>{
        return equipment?.map(equipment => <Tooltip title={equipment?.equipment_name}><EquipmentIcon key={`${props?.room?.room_name}_${equipment?.id}`} src={'http://localhost:3001/' + equipment.path.replace('\\','/')}/></Tooltip>)
    }

    const fetchRoomEquipment = async () => {
        if(!isMounted.current) return;
        
        let result = await getRoomEquipment(userSession?.user?.token, props?.room?.id);
        if(isMounted.current && result?.response?.status === 'OK'){
            setEquipment(result?.response?.equipment || []);
        }
        else{
            console.log(result);
        }
    }

    useEffect(() => {
        isMounted.current = true;
        fetchRoomEquipment();
        return () => {
            isMounted.current = false;
        }
    }, []);

    return (
        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
            <Wrapper onClick={props.onClick}>
                <Header>
                    <Image src={props?.room?.path ? 'http://localhost:3001/' + props?.room?.path.replace('\\','/')  : (process.env.PUBLIC_URL + '/assets/rooms/room.png')}/>
                    <AvailabilityStatus status={props?.room?.available}>{props?.room?.available ? 'Available' : 'Occupied'}</AvailabilityStatus>
                    <RoomName>{props?.room?.room_name}</RoomName>
                </Header>
                <Content>
                    <Capacity><GroupIcon/>Capacity: <CapacityValue>{props?.room?.capacity} people</CapacityValue></Capacity>
                    <Equipment><BentoIcon/>Equipment: {generateEquipment()}</Equipment>
                </Content>
            </Wrapper>
        </Grid>
    )
}

export default RoomItem