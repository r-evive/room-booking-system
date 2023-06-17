import styled from 'styled-components';
import { Button } from "@mui/material";


export const StyledButton = styled(Button)`
    ${props => props.variant === 'contained' && `
            background-color: #6574f5 !important;
    `}
`