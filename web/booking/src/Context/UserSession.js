import React, { useEffect } from 'react';
import { UserSessionJSON } from '../configs/UserSessionJSON';

export const UserSession = React.createContext();

export const UserSessionContext = (props) =>{
    const getLocalSession = () =>{
        let session = localStorage.getItem("userSession");
        if(session){
            return JSON.parse(session);
        }
        return UserSessionJSON;
    }

    const [userSession, setUserSession] = React.useState(getLocalSession());

    useEffect(() => {
        localStorage.setItem("userSession", JSON.stringify(userSession));
    }, [userSession]);

    return (
        <UserSession.Provider value={{userSession, setUserSession}}>
            {props?.children}
        </UserSession.Provider>
    )
}
