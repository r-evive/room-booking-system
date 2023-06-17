import { Button, Grid, TextField } from '@mui/material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider'
import React from 'react'
import moment from 'moment'
import { StyledButton, StyledDateTimePicker, Wrapper } from './DatetimePickers.styled'


const DatetimePickers = (props) => {

    const handleStartTimeChange = (value) =>{
        props.setStartTime(value);
        if(moment(props.endTime).isBefore(moment(value).add(15, 'minutes'))){
            props.setEndTime(moment(value).add(15, 'minutes'));
        }
    }
    const handleEndtTimeChange = (value) => {
        props.setEndTime(value);
    }

    const pickersOptions = {
        minutesStep	: 15,
        ampm : false,
        renderInput: (params) => <TextField {...params} />,
        size: 'small',
        disablePast: true,
        inputFormat: "DD/MM/YYYY HH:mm"
    }

    return (
        <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <Wrapper>
                    <StyledDateTimePicker label="Start time:" value={props.startTime} onChange={handleStartTimeChange} {...pickersOptions}/>
                    <StyledDateTimePicker label="End time:" value={props.endTime} onChange={handleEndtTimeChange} {...pickersOptions} minTime={moment(props.startTime).add(14, 'minutes')} minDate={props.startTime} disableIgnoringDatePartForTimeValidation/>
                    <StyledButton variant="contained" size='large' onClick={props.onSearch}>Search</StyledButton>
                </Wrapper>
            </LocalizationProvider>
        </Grid>
    )
}

export default DatetimePickers