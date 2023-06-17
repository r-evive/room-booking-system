import { Grid } from '@mui/material'
import React, { useContext, useEffect, useRef } from 'react'
import { CancelReservation } from '../../../api/Booking'
import { UserSession } from '../../../Context/UserSession'
import { Wrapper } from './List.styled'
import Reservation from './Reservation/Reservation'

const List = (props) => {
  const isMounted = useRef(true);
  const {userSession, setUserSession} = useContext(UserSession);

  const handleCancelClick = async (event_id) =>{
    let result = await CancelReservation(userSession?.user?.token, event_id);
    if(isMounted.current && result.status === 'OK'){
        props.refreshReservations();
    }
    else{
        console.log(result);
    }
  }

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    }
  }, []);

  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Wrapper>
            {props.reservations ? props.reservations.map(reservation => <Reservation key={`RESERVATION_${reservation.reservation_id}`} reservation={reservation} handleCancelClick={handleCancelClick}/>) : null}
        </Wrapper>
    </Grid>
  )
}

export default List