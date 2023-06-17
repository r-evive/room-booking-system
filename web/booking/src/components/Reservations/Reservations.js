import { Grid } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { GetAllReservations } from '../../api/Booking';
import { UserSession } from '../../Context/UserSession';
import Content from '../Default/Content/Content'
import List from './List/List';

const Reservations = () => {
    const isMounted = useRef(true);
    const {userSession, setUserSession} = useContext(UserSession);
    const [reservations, setReservations] = useState([]);

    const fetchReservations = async () => {
        let result = await GetAllReservations(userSession?.user?.token, !userSession?.user?.is_admin ? userSession?.user?.id : null);
        if(isMounted.current && result.status === 'OK'){
            console.log(result);
            setReservations(result?.response?.reservations || []);
        }
        else{
            console.log(result);
        }
    }

    useEffect(() =>{
        isMounted.current = true;
        fetchReservations();
        return () => {
            isMounted.current = false;
        }

    }, []);
    return (
        <Content>
            <Grid container spacing={2} height={'100%'}>
                <List reservations={reservations} refreshReservations={fetchReservations}></List>
            </Grid>
        </Content>
    )
}

export default Reservations