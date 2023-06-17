import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { DeleteRoom, GetRooms } from '../../../../api/Resources';
import { UserSession } from '../../../../Context/UserSession';
import { TableWrapper } from '../../../Default/Content/Content.styled';
import { CapacityIcon, Header, IDIcon, RoomNameIcon, RowDeleteIcon, RowEditIcon, StyledDataGrid } from './RoomsTable.styled';

const RoomsTable = (props) => {
    const [rooms, setRooms] = useState([]);
    const isMounted = useRef(true);

    const {userSession, setUserSession} = useContext(UserSession);

    const columns = [
        {
            field: 'id',
            width: 100,
            align: 'center',
            renderHeader: (params) => (
                <strong>
                    <IDIcon fontSize='small'/>
                  {'ID'}
                </strong>
            ),
        },
        { 
            field: 'room_name',
            flex: 1,
            renderHeader: (params) => (
                <strong>
                    <RoomNameIcon fontSize='small'/>
                  {'Room name'}
                </strong>
            ),
        },
        { 
            field: 'capacity',
            maxWidth: 150,
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            renderHeader: (params) => (
                <strong>
                    <CapacityIcon fontSize='small'/>
                  {'Capacity'}
                </strong>
            ),
        },
        { 
            field: 'options',
            width: 60,
            renderCell:  (params) => (
                <React.Fragment>
                    <RowEditIcon fontSize='small' onClick={() => handleEditClick(params?.id)}/>
                    <RowDeleteIcon fontSize='small' onClick={() => handleDeleteClick(params?.id)}/>
                </React.Fragment>
            ),
            renderHeader: (params) => (
                <strong>
                  {''}
                </strong>
            ),
        },
    ];

    const handleEditClick = (id) => {
        if(id == undefined) return;

        props.setEditingResource(rooms.filter(room => room.id === id)[0]);
        props.handleEditClick(id);
    }

    const handleDeleteClick = async (id) => {
        if(id == undefined || ! window.confirm('Are you sure you want to remove this room?'))
            return;

        console.log("Deleting", id);
        let result = await DeleteRoom(userSession?.user?.token, id);
        if(isMounted.current && result.status === 'OK'){
            getRoomsList();
        }
        else{
            console.log(result);
        }
    }

    const getRoomsList = async () => {
        if(!isMounted.current) return;
        
        let result = await GetRooms(userSession?.user?.token);
        if(isMounted.current && result.status === 'OK'){
            handleRoomsFetch(result?.response?.rooms || []);
        }
        else{
            console.log(result);
        }
    }

    const handleRoomsFetch = (roomsArray) =>{
        let roomsList = [];
        
        roomsArray.forEach(room => {
            roomsList.push({
                ...room
            })
        });
        setRooms(roomsList);
    }

    useEffect(() =>{
        isMounted.current = true;
        props.setRefreshRooms({callback: () => getRoomsList()});
        getRoomsList();

        return () => {
            isMounted.current = false;
        }
    }, []);

    return (
        <Grid item xs={12} sm={12} md={6} lg={6}>
            <Header>Rooms</Header>
            <TableWrapper>
                <StyledDataGrid rows={rooms} columns={columns} pageSize={20} rowsPerPageOptions={[20]} autoHeight disableSelectionOnClick/>
            </TableWrapper>
        </Grid>
    )
}

export default RoomsTable