import { Button, Grid, TextField } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { GetRooms, GetRoomsAvability } from '../../api/Resources'
import { UserSession } from '../../Context/UserSession'
import Content from '../Default/Content/Content'
import RoomItem from './RoomItem/RoomItem'
import DatetimePickers from './DatetimePickers/DatetimePickers';
import moment from 'moment';
import BookModal from './BookModal/BookModal';
import { AddEvent } from '../../api/Booking';

moment.fn.roundNext15Min = function () {
    var intervals = Math.floor(this.minutes() / 15);
    if(this.minutes() % 15 != 0)
        intervals++;
        if(intervals == 4) {
            this.add('hours', 1);
            intervals = 0;
        }
        this.minutes(intervals * 15);
        this.seconds(0);
        return this;
}


const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [startTime, setStartTime] = useState(moment().roundNext15Min());
    const [endTime, setEndTime] = useState(moment().roundNext15Min().add(15, 'minutes'));
    const {userSession, setUserSession} = useContext(UserSession);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [searchOptions, setSearchOptions] = useState({});
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [eventName, setEventName] = useState('');
    const isMounted = useRef(true);

    const setDefaultTimes = () =>{
        setStartTime(moment().roundNext15Min());
        setEndTime(moment().roundNext15Min().add(15, 'minutes'));
    }

    const handleRoomOnClick = (value, avability) =>{
        if(!avability)
            return;
        setEventName('');
        setSearchOptions((prev) => {return {...prev, room: rooms.filter(room => room?.id === value)[0]}})
        setIsModalOpen(true);
    }

    const generateRooms = () => {
        let resultItems = [];

        rooms.forEach(room => {
            resultItems.push(<RoomItem key={`room_id_${room?.id}`} room={room} selectedRoom={selectedRoom} onClick={() => handleRoomOnClick(room?.id, room?.available)}/>)
        });

        return resultItems;
    }

    const handleModalClose = () =>{
        setError(null);
        setIsModalOpen(false);
    }

    const handleSearch = () =>{
        fetchRoomsList();
    }

    const fetchRoomsList = async() =>{
        setSearchOptions({startTime: startTime, endTime: endTime});

        let result = await GetRoomsAvability(userSession?.user?.token, startTime, endTime);
        if(isMounted.current && result.status === 'OK'){
            setRooms(result?.response?.rooms || []);
        }
        else{
            console.log(result);
        }
    }

    const handleBookEvent = async() =>{
        let event = {
            name : eventName.length > 0 ? eventName : 'Meeting',
            start_time : startTime,
            end_time : endTime,
            room_id : searchOptions?.room?.id,
            owner: userSession?.user?.id
        }

        let result = await AddEvent(userSession?.user?.token, event);
        console.log(result);
        if(isMounted.current && result?.response?.status === 'OK'){
            handleModalClose();
            fetchRoomsList();
        }
        else{
            console.log(result);
            setError(result?.response?.message);
            console.log(result);
        }
    }

    useEffect(() =>{
        isMounted.current = true;
        setDefaultTimes();
        
        fetchRoomsList();
        return () => {
            isMounted.current = false;
        }
    }, []);

    return (
        <Content>
            <Grid container spacing={2}>
                <DatetimePickers startTime={startTime} endTime={endTime} setStartTime={setStartTime} setEndTime={setEndTime} onSearch={handleSearch}/>
                {generateRooms()}
                {isModalOpen ? <BookModal isOpen={isModalOpen} handleClose={handleModalClose} searchOptions={searchOptions} handleSubmit={handleBookEvent} eventName={eventName} setEventName={setEventName} error={error}/> : null}
            </Grid>
        </Content>
    )
}

export default Rooms