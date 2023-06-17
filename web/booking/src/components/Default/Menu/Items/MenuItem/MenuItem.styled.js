import styled from 'styled-components';


export const Wrapper = styled.div`
    width: 100%;
    height: 50px;
    margin: 10px 0;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: rgb(248 250 252);
    transition: all 0.3s ease-in-out;
    ${props => props.isSelected && `
        background-color: rgba(255, 255, 255, 0.08);
        color: #6574f5;
    `}
    cursor: pointer;
`;


export const Icon = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Label = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 10px;
    animation: fadein 0.3s ease-in 0.2s forwards;
    opacity: 0;
    width: 0px;
    padding-left: 0px;

    @keyframes fadein {
        from {
            opacity: 0;
            width: 0px;
            padding-left: 0px;
        }
        to {
            opacity: 1;
            padding-left: 10px;
        }
    }

    @keyframes fadeout {
        from {
            opacity: 1;
            padding-left: 10px;
        }
        to {
            opacity: 0;
            width: 0px;
            padding-left: 0px;
        }
    }

    @media screen and (max-width: 576px) {
        animation: fadeout 0.3s ease-out 0s forwards;
    }
`