import React from 'react'
import Items from './Items/Items'
import Logo from './Logo/Logo'
import Logout from './Logout/Logout'
import { MenuContainer, MenuContent } from './Menu.styled'
import Welcome from './Welcome/Welcome'

const Menu = () => {
  return (
    <MenuContainer>
        <MenuContent>
            <Logo></Logo>
            <Welcome></Welcome>
            <Items></Items>
            <Logout/>
        </MenuContent>
    </MenuContainer>
  )
}

export default Menu