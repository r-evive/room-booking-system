import styled from 'styled-components';


export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 300px 1fr;
    height: 100%;
    transition: all 0.3s ease-in-out;


    @media screen and (max-width: 768px) {
        grid-template-columns: 200px 1fr;
    }
    
    @media screen and (max-width: 576px) {
        grid-template-columns: 80px 1fr;
    }

`