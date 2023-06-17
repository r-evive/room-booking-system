import { Box, Button, TextField } from '@mui/material';
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

export const FileUploadContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const FileUploadButton = styled(StyledButton)`
    width: 50% !important;
`;

export const FileUploadTextField = styled(StyledTextField)`
    width: 50% !important;
    margin-bottom: 0 !important;
`

export const EquipmentContainer = styled.div`
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 8px;
`;

export const EquipmentItem = styled.div`
    position: relative;
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    overflow: hidden;
    flex-direction: column;
    cursor: pointer;
    ${props => props?.selected && `
        outline: 2px solid #4153f3;
        border-radius: 3px;
    `}
`

export const EquipmentImage = styled.div`
    width: 100%;
    height: 60px;
    background-image: url(${props => props.src});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    margin-bottom: 5px;
`;

export const EquipmentName = styled.div`
    width: 100%;
    color: #000;
    font-size: 12px;
    line-height: 12px;
    text-align: center;
`