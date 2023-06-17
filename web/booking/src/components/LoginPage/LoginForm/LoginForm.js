import React, { useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Login } from '../../../api/UserRequests';
import { UserSession } from '../../../Context/UserSession';
import { Error, ForgotPassword, LoginButton, SignUpBold, SignUpLabel } from './LoginForm.styled'


const LoginForm = () => {
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(null);
    const {userSession, setUserSession} = useContext(UserSession);

    const handleLoginChange = (event) => {
        setError(null);
        let login = event.target.value ? event.target.value : '';
        setLogin(login);
    }

    const handlePasswordChange = (event) => {
        setError(null);
        let password = event.target.value ? event.target.value : '';
        setPassword(password);
    }

    const handleLoginAction = async (event) =>{
        event.preventDefault();
        console.log(userSession);
        if(validateForm()){
            let result = await Login(login, password);
            if(result.status === 'OK' && result?.response?.token){
                setUserSession({loggedIn: true, user: result?.response});
            }
            else{
                setError(result?.message);
            }
        }
        else{
            setError('Fill all fields!');
        }
    }

    const validateForm = () => {
        return login.length > 0  && password.length > 0;
    }

    return (
        <React.Fragment>
            <Form className="w-100 justify-content-center" onSubmit={handleLoginAction}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Login:</Form.Label>
                    <Form.Control type="text" value={login} onChange={handleLoginChange} isInvalid={!!error}/>
                </Form.Group>
                {error ? <Error>Incorrect credentials</Error> : null}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" value={password} onChange={handlePasswordChange} isInvalid={!!error}/>
                    <ForgotPassword>Forgot password?</ForgotPassword>
                </Form.Group>
                <LoginButton variant="primary" type="submit">
                    Login
                </LoginButton>
                <SignUpLabel>Don't have an account? <SignUpBold>Sign up!</SignUpBold></SignUpLabel>
            </Form>
        </React.Fragment>
    )
}

export default LoginForm