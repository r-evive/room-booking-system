import React, { useContext } from 'react'
import { Wrapper } from './Items.styled'
import MenuItem from './MenuItem/MenuItem'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { UserSession } from '../../../../Context/UserSession';

const Items = () => {
    const {userSession, setUserSession} = useContext(UserSession);

    const Items = [
        {
            name: "Book",
            icon: <BedOutlinedIcon/>,
            path: "/",
            dependency: true,
        },
        {
            name: "Reservations",
            icon: <FormatListBulletedOutlinedIcon/>,
            path: "/reservations",
            dependency: true,
        },
        {
            name: "Resources",
            icon: <AppsOutlinedIcon/>,
            path: "/resources",
            dependency: userSession?.user?.is_admin === true
        },
        {
            name: "Settings",
            icon: <SettingsOutlinedIcon/>,
            path: "/settings",
            dependency: true,
        },
    ]

  return (
    <Wrapper>
        {Items.filter(item => item.dependency === true).map((item, index) => <MenuItem key={`${item.name}_${index}`} name={item.name} icon={item.icon} path={item.path}/>)}
    </Wrapper>
  )
}

export default Items