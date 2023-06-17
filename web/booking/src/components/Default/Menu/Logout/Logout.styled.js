import { Button } from '@mui/material';
import styled from 'styled-components';


export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StyledButton = styled(Button)`
    background-color: #6574f5 !important;
    font-family: 'Poppins' !important;

    @media screen and (max-width: 576px) {
        span{
            margin: 0;
        }
    }
`;

export const Title = styled.span`
    opacity: 1;

    @media screen and (max-width: 576px) {
        width: 0;
        height: 0;
        opacity: 0;
     }
`;