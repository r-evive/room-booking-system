import { Button } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import styled from 'styled-components';



export const StyledDateTimePicker = styled(DateTimePicker)`
    margin-right: 20px !important;
    margin-bottom: 10px !important;
    
    @media (max-width: 900px) and (min-width: 560px) {
        margin-right: 0 !important;
        width: calc(50% - 10px) !important;

        &:nth-child(1) {
            margin-right: 10px !important;
        }

        &:nth-child(2) {
            margin-left: 10px !important;
        }

    }

    @media (max-width: 560px) {
        width: 100% !important;
        margin-right: 0 !important;
        margin-left: 0 !important;
    }

`

export const Wrapper = styled.div`
    display: flex;
    padding: 0 10px;
    @media (max-width: 900px) {
        flex-wrap: wrap;
    }
`

export const StyledButton = styled(Button)`
    margin-bottom: 10px !important;

    @media (max-width: 900px) {
        width: 100%;
    }
    ${props => props.variant === 'contained' && `
            background-color: #6574f5 !important;
    `}
`