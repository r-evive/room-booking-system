import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Icon, Label, Wrapper } from './MenuItem.styled'

const MenuItem = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleOnClick = () =>{
        navigate(props.path);
    }

  return (
    <Wrapper isSelected={location.pathname === props?.path} onClick={handleOnClick}>
        <Icon>{props.icon}</Icon>
        <Label>{props.name}</Label>
    </Wrapper>
  )
}

export default MenuItem