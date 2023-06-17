import React from 'react'
import { Content, Controls, Data, EventTime, EventTimeBold, Organizer, Room, RoomIcon, RoomName, Status, StyledButton, Times, Title, Wrapper } from './Reservation.styled'
import moment from 'moment';
import { Badge } from 'react-bootstrap';

const Reservation = (props) => {

    const generateTime = () =>{
        if(moment(props?.reservation?.event_start_time).isSame(props?.reservation?.event_end_time, 'days')){
            return  <EventTime>{moment(props?.reservation?.event_start_time).format('DD/MM/YYYY')}<EventTimeBold>{moment(props?.reservation?.event_start_time).format('HH:mm')} - {moment(props?.reservation?.event_end_time).format('HH:mm')}</EventTimeBold></EventTime>
        }
        else{
            return (
                <React.Fragment>
                    <EventTime>{moment(props?.reservation?.event_start_time).format('DD/MM/YYYY')}<EventTimeBold>{moment(props?.reservation?.event_start_time).format('HH:mm')}</EventTimeBold></EventTime>
                    <EventTime>{moment(props?.reservation?.event_end_time).format('DD/MM/YYYY')}<EventTimeBold>{moment(props?.reservation?.event_end_time).format('HH:mm')}</EventTimeBold></EventTime>
                </React.Fragment>
            )
        }
    }

    const handleCancelClick = (event) =>{
        props.handleCancelClick(props?.reservation?.reservation_id);
    }

    return (
        <Wrapper>
            <Content>
                <Data>
                    <Title>{props?.reservation?.event_name}</Title>
                    <Organizer>{props?.reservation?.full_name}</Organizer>
                </Data>
                <Room>
                    <RoomIcon/><RoomName>{props?.reservation?.room_name}</RoomName>
                </Room>
                <Times>
                    <EventTime>{generateTime()}</EventTime>
                </Times>
                <Status>
                    {props?.reservation?.event_status == 1 ? <Badge bg="success">Confirmed</Badge> : <Badge bg="danger">Canceled</Badge>}
                </Status>
            </Content>
            <Controls>
                {props?.reservation?.event_status == 1 ? <StyledButton variant='contained' size='small' onClick={handleCancelClick}>Cancel</StyledButton> : null }
            </Controls>
        </Wrapper>
  )
}

export default Reservation