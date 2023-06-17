import { Button, Grid, Modal } from "@mui/material"
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Content from "../Default/Content/Content"
import { DataGrid } from '@mui/x-data-grid';
import RoomsTable from "./RoomResources/RoomsTable/RoomsTable";
import AddResource from "./AddResource/AddResource";
import { StyledButton } from "./Resources.styled";
import EquipmentTable from "./RoomResources/EquipmenTable/EquipmentTable";

const Resources = () => {
    const navigation = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [refreshRooms, setRefreshRooms] = useState(() => {});
    const [refreshEquipment, setRefreshEquipment] = useState(() => {});
    const [editingResource, setEditingResource] = useState(null);

    const handleClose = () =>{
        setEditingResource(null);
        setIsOpen(false);
    }

    const handleAddResourceClick = () =>{
        setIsOpen(true);
    }

    const handleEditClick = (event) =>{
        setIsOpen(true);
    }

    return (
        <Content buttons={<StyledButton variant="contained" size="small" onClick={handleAddResourceClick}>Add resource</StyledButton>}>
            <Grid container spacing={2}>
                <RoomsTable setRefreshRooms={setRefreshRooms} handleEditClick={handleEditClick} setEditingResource={setEditingResource}/>
                <EquipmentTable setRefreshEquipment={setRefreshEquipment} handleEditClick={handleEditClick} setEditingResource={setEditingResource}/>
            </Grid>
            {isOpen ? <AddResource isOpen={isOpen} handleClose={handleClose} refreshRooms={refreshRooms.callback} refreshEquipment={refreshEquipment.callback} editingResource={editingResource}/> : null}
        </Content>
    )
}

export default Resources