import React, { useContext } from 'react'
import { UserSession } from '../../../../Context/UserSession';
import { AvatarContainer, Image, Label, LabelContainer, Name, Wrapper } from './Welcome.styled'

const Welcome = () => {
    const {userSession} = useContext(UserSession);

    return (
        <Wrapper>
            <AvatarContainer>
                <Image src={userSession?.user?.avatar_image ? 'http://localhost:3001/' + userSession?.user?.avatar_image.replace('\\','/') : "https://www.w3schools.com/howto/img_avatar.png"}></Image>
            </AvatarContainer>
            <LabelContainer>
                <Label>Welcome, <Name>{userSession?.user?.full_name}</Name></Label>
            </LabelContainer>
        </Wrapper>
    )
}

export default Welcome