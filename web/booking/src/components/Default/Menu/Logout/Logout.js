import React, { useContext } from 'react'
import { StyledButton, Title, Wrapper } from './Logout.styled'
import LogoutIcon from '@mui/icons-material/Logout';
import { UserSession } from '../../../../Context/UserSession';
import {UserSessionJSON} from '../../../../configs/UserSessionJSON';

const Logout = () => {
    const { userSession, setUserSession } = useContext(UserSession);

    const logout = () => {
        setUserSession(UserSessionJSON);
    }

    const handleButtonClick = () => {
        logout();
    }

    return (
        <Wrapper>
            <StyledButton variant="contained" startIcon={<LogoutIcon />} onClick={handleButtonClick}><Title>Log out</Title></StyledButton>
        </Wrapper>
    )
}

export default Logout