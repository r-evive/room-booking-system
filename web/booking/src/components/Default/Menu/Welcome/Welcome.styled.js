import styled from 'styled-components';


export const Wrapper = styled.div`
    width: 100%;
    opacity: 1;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 20px;

    ::after{
        content: "";
        margin-top: 20px;
        width: calc(100% - 40px);
        height: 2px;
        background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(255, 255, 255, 0.75), rgba(0, 0, 0, 0));
    }

    @media screen and (max-width: 576px) {
        height: 0;
        width: 0;
        opacity: 0;
    }
`


export const AvatarContainer = styled.div`
    width: 100%;
    height: 120px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
`;

export const Image = styled.img`
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`

export const LabelContainer = styled.div`
    padding: 0 20px;
    text-align: center;
`;


export const Label = styled.span`
    font-size: 16px;
    color: #fff;
    font-weight: 300;

`;

export const Name = styled.span`
    font-weight: 400;
    color: #6574f5;
`;