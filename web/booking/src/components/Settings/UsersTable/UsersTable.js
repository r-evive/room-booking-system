import { Grid } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Badge } from 'react-bootstrap';
import { DeleteUser, GetUsers } from '../../../api/UserRequests';
import { UserSession } from '../../../Context/UserSession';
import { TableWrapper } from '../../Default/Content/Content.styled';
import { CapacityIcon, Header, IDIcon, RoomNameIcon, RowChangeIcon, RowDeleteIcon, RowEditIcon, StyledDataGrid } from './UsersTable.styled';

const UsersTable = (props) => {
    const [users, setUsers] = useState([]);
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
            field: 'full_name',
            flex: 1,
            renderHeader: (params) => (
                <strong>
                    <RoomNameIcon fontSize='small'/>
                  {'Full name'}
                </strong>
            ),
        },
        { 
            field: 'login',
            flex: 1,
            renderHeader: (params) => (
                <strong>
                    <RoomNameIcon fontSize='small'/>
                  {'Login'}
                </strong>
            ),
        },
        { 
            field: 'is_admin',
            maxWidth: 150,
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            renderHeader: (params) => (
                <strong>
                    <CapacityIcon fontSize='small'/>
                  {'Admin'}
                </strong>
            ),
            renderCell:  (params) => (
                <React.Fragment>
                    {params.value === true? <Badge bg="success">Yes</Badge> : <Badge bg="danger">No</Badge>}
                </React.Fragment>
            ),
        },
        { 
            field: 'options',
            width: 60,
            renderCell:  (params) => (
                <React.Fragment>
                    {userSession?.user?.is_admin || userSession?.user?.id === params.id? (
                        <React.Fragment>
                            <RowEditIcon fontSize='small' onClick={() => handleEditClick(params?.id)}/>
                            <RowChangeIcon fontSize='small' onClick={() => handlePasswordChangeClick(params?.id)}/>
                            {/* <RowDeleteIcon fontSize='small' onClick={() => handleDeleteClick(params?.id)}/> */}
                        </React.Fragment>
                    ) : (
                        null
                    )}
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

        props.setEditingUser(users.filter(users => users.id === id)[0]);
        props.handleEditClick(id);
    }

    const handlePasswordChangeClick = (id) =>{
        if(id == undefined) return;

        props.setEditingUser(users.filter(users => users.id === id)[0]);
        props.handleChangePasswordClick(id);
    }

    const handleDeleteClick = async (id) => {
        if(id == undefined) return;

        let result = await DeleteUser(userSession?.user?.token, id);
        if(isMounted.current && result.status === 'OK'){
            getUsersList();
        }
        else{
            console.log(result);
        }
    }

    const getUsersList = async () => {
        if(!isMounted.current) return;
        
        let result = await GetUsers(userSession?.user?.token);
        if(isMounted.current && result.status === 'OK'){
            handleUsersFetch(result?.response?.users || []);
        }
        else{
            console.log(result);
        }
    }

    const handleUsersFetch = (usersArray) =>{
        let usersList = [];
        
        usersArray.forEach(user => {
            usersList.push({
                ...user
            })
        });
        setUsers(usersList);
    }

    useEffect(() =>{
        isMounted.current = true;
        props.setRefreshUsers({callback: () => getUsersList()});
        getUsersList();

        return () => {
            isMounted.current = false;
        }
    }, []);

    return (
        <Grid item xs={12} sm={12} md={12} lg={12}>
            <Header>Users</Header>
            <TableWrapper>
                <StyledDataGrid rows={users} columns={columns} pageSize={20} rowsPerPageOptions={[20]} autoHeight disableSelectionOnClick/>
            </TableWrapper>
        </Grid>
    )
}

export default UsersTable