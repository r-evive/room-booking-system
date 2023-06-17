import styled from 'styled-components';


export const Background = styled.div`
    width: 100%;
    height: 100%;
    display: block;
    position: relative;
    background: rgb(31,31,31);
    background: linear-gradient(0deg, rgba(31,31,31,1) 0%, rgb(20,54,126, 1) 35%, rgba(241,241,241,1) 100%);
`


export const LoginContainer = styled.div`
    display: flex;
    width: 100%;
    height: 600px;
    background-color: #F1F1F1;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-start;
    padding: 10px 20px 40px 20px;
    border-radius: 5px;
`;

export const LogoContainer = styled.div`
    width: 100%;
    height: 150px;
    margin: 0 0 40px 0;
`

export const Logo = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;
