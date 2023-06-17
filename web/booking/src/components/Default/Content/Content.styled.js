import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgb(248 250 252);
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
`;

export const Navigation = styled.div`
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    padding: 10px 40px;
    display: flex;
    flex-direction: row;
    background-color: #fff;
    z-index: 500;
`;


export const NavigationButtons = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;
    padding: 10px 0;
`;

export const NavigationLabels = styled.div`
    flex: 1;
`;

export const NavigationHeader = styled.div`
    text-transform: capitalize;
    font-size: 22px;
`

export const NavigationSubtitle = styled.div`
    display: flex;
    text-transform: capitalize;
    font-size: 14px;
`;

export const NavigationElement = styled.div`
    color: #4153f3;
    ::before{
        color: #212529;
        padding: 0 5px;
        content: '>';
    }
`;

export const ContentWrapper = styled.div`
    width: 100%;
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    flex-grow: 1;
    overflow-x: hidden;
    padding: 20px 20px;
    background-color: #fafafa;
    overflow-y: hidden;
`;

export const TableWrapper = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 10px;
`;
