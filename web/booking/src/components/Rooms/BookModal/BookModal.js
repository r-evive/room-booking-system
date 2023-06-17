import { Fade, Modal } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { BoxStyled, Content, Error, Footer, StyledBox, StyledButton, StyledTextField, Title } from './BookModal.styled'

const BookModal = (props) => {
    const handleEventNameChange = (event) => {
        props.setEventName(event.target.value);
    }

    const hasErrorOccurred = () => {
        console.log(props?.error);
        if(props?.error){
            if(props?.error == 'ROOM_OCCUPIED')
                return <Error>Oh no! Someone just booked this room! :(</Error>
            else
                return <Error>Something went wrong!</Error>
        }
        return null;
    }

    return (
        <Modal open={props.isOpen} onClose={props.handleClose} closeAfterTransition>
            <Fade in={props.isOpen} >
                <BoxStyled>
                    <Content>
                        <Title>Book room</Title>
                        <StyledBox component="form" sx={{}}>
                            <StyledTextField id="room_name" label="Room name" size="small" value={props?.searchOptions?.room?.room_name || ''} readOnly/>
                            <StyledTextField id="start_time" label="Start time" size="small" value={props?.searchOptions?.startTime?.format('DD/MM/YYYY HH:mm') || ''} readOnly/>
                            <StyledTextField id="end_time" label="End time" size="small" value={props?.searchOptions?.endTime?.format('DD/MM/YYYY HH:mm') || ''} readOnly/>
                            <StyledTextField id="event_name" label="Event name" size="small" onChange={handleEventNameChange} autoFocus/>
                            {hasErrorOccurred()}
                        </StyledBox>
                    </Content>
                    <Footer>
                            <StyledButton variant="outlined" size="medium" onClick={props.handleClose}>Cancel</StyledButton>
                            <StyledButton onClick={props.handleSubmit} variant="contained" size="medium">Book</StyledButton>
                    </Footer>
                </BoxStyled>
            </Fade>
        </Modal>
    )
}

export default BookModal