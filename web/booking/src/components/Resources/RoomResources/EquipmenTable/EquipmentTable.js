import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { DeleteEquipment, DeleteRoom, GetEquipment, GetRooms } from '../../../../api/Resources';
import { UserSession } from '../../../../Context/UserSession';
import { TableWrapper } from '../../../Default/Content/Content.styled';
import { CapacityIcon, Header, IDIcon, RoomNameIcon, RowDeleteIcon, RowEditIcon, StyledDataGrid } from '../RoomsTable/RoomsTable.styled';

const EquipmentTable = (props) => {
    const [equipment, setEquipment] = useState([]);
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
            field: 'equipment_name',
            flex: 1,
            renderHeader: (params) => (
                <strong>
                    <RoomNameIcon fontSize='small'/>
                  {'Equipment name'}
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

        props.setEditingResource(equipment.filter(equipment => equipment.id === id)[0]);
        props.handleEditClick(id);
    }

    const handleDeleteClick = async (id) => {
        if(id == undefined || !window.confirm('Are you sure you want to remove this equipment?'))
            return;

        console.log("Deleting", id);
        let result = await DeleteEquipment(userSession?.user?.token, id);
        if(isMounted.current && result.status === 'OK'){
            getEquipmentList();
        }
        else{
            console.log(result);
        }
    }

    const getEquipmentList = async () => {
        if(!isMounted.current) return;
        
        let result = await GetEquipment(userSession?.user?.token);
        if(isMounted.current && result.status === 'OK'){
            handleEquipmentFetch (result?.response?.equipment || []);
        }
        else{
            console.log(result);
        }
    }

    const handleEquipmentFetch = (equipmentArray) =>{
        let equipmentList = [];
        
        equipmentArray.forEach(equipment => {
            equipmentList.push({
                ...equipment
            })
        });

        setEquipment(equipmentList);
    }

    useEffect(() =>{
        isMounted.current = true;
        props.setRefreshEquipment({callback: () => getEquipmentList()});
        getEquipmentList();

        return () => {
            isMounted.current = false;
        }
    }, []);

    return (
        <Grid item xs={12} sm={12} md={6} lg={6}>
            <Header>Equipment</Header>
            <TableWrapper>
                <StyledDataGrid rows={equipment} columns={columns} pageSize={20} rowsPerPageOptions={[20]} autoHeight disableSelectionOnClick/>
            </TableWrapper>
        </Grid>
    )
}

export default EquipmentTable