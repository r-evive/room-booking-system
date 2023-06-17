import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {UserSession} from '../../../Context/UserSession';
import { Wrapper } from '../../Default/Defaults.styled';
import Menu from '../../Default/Menu/Menu';

export const PrivateRoute = (props) => {
    const {userSession, setUserSession} = React.useContext(UserSession);
    const location = useLocation()
  
    return userSession?.loggedIn ? (
    <Wrapper>
        <Menu/>
        {props.children}
    </Wrapper>
    ) : (<Navigate replace={true} to="/login" state={{ from: `${location.pathname}${location.search}` }}/>
    )
}