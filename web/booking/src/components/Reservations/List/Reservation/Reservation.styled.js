import styled from 'styled-components';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { Button } from '@mui/material';

export const Wrapper = styled.div`
    width: 100%;
    height: 100px;
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 20px;
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
`;

export const Content = styled.div`
    position: relative;
    display: grid;
    flex: 1;
    grid-template-columns: 3fr 2fr 2fr 1fr;
`;  

export const Title = styled.div`
    width: 100%;
    position: relative;
    font-size: 16px;
    color: #4153f3;
    font-weight: 500;
    margin-bottom: 0px;
`;

export const Organizer = styled.div`
    width: 100%;
    position: relative;
    font-size: 14px;
    color: #000;
    font-weight: 400;
    margin-bottom: 5px;
`;

export const Data = styled.div`
    display: flex;
    flex: 1;
    align-self: flex-start;
    height: 100%;
    padding: 20px 20px;
    flex-wrap: wrap;
`;

export const Times = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: flex-end;
    height: 100%;
    padding: 0 20px;
`;

export const RoomIcon = styled(MeetingRoomIcon)`
    color: #4153f3;
    margin-right: 10px;
`;


export const Room = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: flex-end;
    height: 100%;
    padding: 20px 10px;
`;

export const RoomName = styled.div`
    width: 100%;
    position: relative;
    font-size: 14px;
    color: #000;
    font-weight: 400;
    margin-bottom: 0px;
`;

export const EventTime = styled.div`
    width: 100%;
    text-align: end;
    position: relative;
    font-size: 14px;
    color: #000;
    font-weight: 400;
    margin-bottom: 0px;
`;

export const EventTimeBold = styled.span`
    font-weight: bold;
    margin-left: 10px;
`;

export const Controls = styled.div`
    align-self: flex-end;
    width: 150px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Status = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StyledButton = styled(Button)`
    background-color: #6574f5 !important;

`;