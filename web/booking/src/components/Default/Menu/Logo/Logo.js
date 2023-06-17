import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Image, LogoWrapper } from './Logo.styled'

const Logo = () => {
    let navigation = useNavigate();

    const handleOnClick = () =>{
        navigation('/');
    }
  return (
    <LogoWrapper>
        <Image src={process.env.PUBLIC_URL + '/assets/logo_white.png'} alt="logo" onClick={handleOnClick}/>
    </LogoWrapper>
  )
}

export default Logo