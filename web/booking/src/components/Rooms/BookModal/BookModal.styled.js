import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import styled from 'styled-components';

export const BoxStyled = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);
    width: 400px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border-radius: 3px;
`;

export const Content = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    min-height: 200px;
    padding: 20px 20px;
    border-bottom: 1px solid #ddd;
    flex-wrap: wrap;
    flex-direction: column;
`;

export const Footer = styled.div`
    width: 100%;
    align-self: flex-end;
    padding: 15px 20px;
    display: flex;
    justify-content: flex-end;
`;

export const StyledButton = styled(Button)`
    margin-left: 10px !important;

    ${props => props.variant === 'contained' && `
        background-color: #6574f5 !important;
    `}
`

export const Title = styled.div`
    width: 100%;
    font-size: 20px;
    color: #4153f3;
    margin-bottom: 10px;
`

export const StyledTextField = styled(TextField)`
    width: 100%;
    margin-bottom: 20px !important;
    label.Mui-focused{
        color: #4153f3 !important;
    }

    fieldset{
        transition: border-color 0.2s ease-in-out;
    }
    .Mui-focused fieldset{
        border-color: #4153f3 !important;
    }
`

export const StyledBox = styled(Box)`
    margin-top: 20px;
`

export const Error = styled.div`
    position: relative;
    font-size: 14px;
    height: 0;
    width: 100%;
    top: -15px;
    text-align: right;
    color: #fb0000;
    font-weight: 400;
    padding-right: 10px;
`