import React, { useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import { UserSession } from '../../Context/UserSession'
import LoginForm from './LoginForm/LoginForm'
import { Background, LoginContainer, Logo, LogoContainer } from './LoginPage.styled'

const LoginPage = () => {
    const {userSession, setUserSession} = useContext(UserSession);

    return (
        <>
            {userSession?.loggedIn === true ? <Navigate to="/"/> : null}
            <Background>
                <Container fluid className="h-100">
                        <Container className="h-100">
                            <Col sm='12' md={{ span: 4, offset: 4 }} className="d-flex justify-conent-center align-items-center h-100">
                                <LoginContainer>
                                    <LogoContainer>
                                        <Logo src={process.env.PUBLIC_URL + '/assets/logo.png'}/>
                                    </LogoContainer>
                                    <LoginForm/>
                                </LoginContainer>
                            </Col>

                        </Container>
                </Container>
            </Background>
        </>
    )
}

export default LoginPage