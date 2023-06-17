import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const LoginButton = styled(Button)`
    width: 100%;
    margin-top: 20px;
    margin-bottom: 30px;
    text-transform: uppercase;
    background-color: #6574f5;
`;

export const SignUpLabel = styled.p`
    width: 100%;
    font-size: 1rem;
    text-align: center;
`;

export const SignUpBold = styled.span`
    font-size: 1rem;
    color: #114084;
    font-weight: bold;
    cursor: pointer;
`;

export const ForgotPassword = styled.span`
    width: 100%;
    font-size: 0.9rem;
    color: #114084;
    display: block;
    margin-top: 5px;
    cursor: pointer;
`

export const Error = styled.div`
    position: relative;
    font-size: 14px;
    height: 0;
    width: 100%;
    top: 0px;
    text-align: right;
    color: #fb0000;
    font-weight: 400;
    padding-right: 10px;
`;