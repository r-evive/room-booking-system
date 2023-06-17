import { Grid } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserSession } from "../../Context/UserSession";
import Content from "../Default/Content/Content"
import AddResource from "./AddUser/AddUser";
import ChangePassword from "./ChangePassword/ChangePassword";
import { StyledButton } from "./Settings.styled";
import UsersTable from "./UsersTable/UsersTable";

const Settings = () => {
    const navigation = useNavigate();
    const {userSession, setUserSession} = useContext(UserSession);
    const [isEditingOpen, setIsEditingOpen] = useState(false);
    const [isChangingOpen, setIsChangingOpen] = useState(false);
    const [refreshUsers, setRefreshUsers] = useState(() => {});
    const [editingUser, setEditingUser] = useState(null);

    const handleClose = () =>{
        setEditingUser(null);
        setIsChangingOpen(false);
        setIsEditingOpen(false);
    }

    const handleAddUserClick = () =>{
        setIsEditingOpen(true);
    }

    const handleEditClick = (event) =>{
        setIsEditingOpen(true);
    }

    const handleChangePasswordClick = (event) => {
        setIsChangingOpen(true);
    }

    return (
        <Content buttons={userSession?.user?.is_admin ? <StyledButton variant="contained" size="small" onClick={handleAddUserClick}>Add user</StyledButton> : null}>
            <Grid container spacing={2}>
                <UsersTable setRefreshUsers={setRefreshUsers} handleEditClick={handleEditClick} handleChangePasswordClick={handleChangePasswordClick} setEditingUser={setEditingUser}/>
            </Grid>
            {isEditingOpen ? <AddResource isOpen={isEditingOpen} handleClose={handleClose} refreshUsers={refreshUsers.callback} editingUser={editingUser}/> : null}
            {isChangingOpen ? <ChangePassword isOpen={isChangingOpen} handleClose={handleClose} editingUser={editingUser}/> : null}
        </Content>
    )
}

export default Settings