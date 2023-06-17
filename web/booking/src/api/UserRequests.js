import { Errors } from "./Errors";

export const Login = async (login, password) => {
    return fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            login: login,
            password: password
        })
    }).then(response => {
        if(response.ok)
            return response.json();
        throw new Error(response?.status);
    }).then(json => {
        return {status: 'OK', response: json};
    }).catch(error => {
        return {status: 'ERROR', message: Errors[error.message] || 'Unknown error'};
    });
}


export const Register = async(userData) => {
    return fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(userData)
    }).then(response => {
        if(response.ok)
            return response.json();
        throw new Error(response?.status);
    }).then(json => {
        return {status: 'OK', response: json};
    }).catch(error => {
        return {status: 'ERROR', message: Errors[error.message] || 'Unknown error'};
    });
}

export const UpdateUser = async(token, user) => {
    return fetch('http://localhost:3001/users/updateuser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(user)
    }).then(response => {
        if(response.ok)
            return response.json();
        throw new Error(response?.status);
    }).then(json => {
        return {status: 'OK', response: json};
    }).catch(error => {
        return {status: 'ERROR', message: Errors[error.message] || 'Unknown error'};
    });
}


export const GetUsers= (token) => {
    return fetch('http://localhost:3001/users/getusers', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + token
        },
    }).then(response => {
        if(response.ok)
            return response.json();
        throw new Error(response?.status);
    }).then(json => {
        return {status: 'OK', response: json};
    }).catch(error => {
        return {status: 'ERROR', message: Errors[error.message] || 'Unknown error'};
    });
}

export const DeleteUser = (token, userID) => {
    return fetch('http://localhost:3001/users/deleteuser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            user_id: userID
        })
    }).then(response => {
        if(response.ok)
            return response.json();
        throw new Error(response?.status);
    }).then(json => {
        return {status: 'OK', response: json};
    }).catch(error => {
        return {status: 'ERROR', message: Errors[error.message] || 'Unknown error'};
    });
}

export const ChangeUserPassword = async(token, user) => {
    return fetch('http://localhost:3001/users/changepassword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(user)
    }).then(response => {
        if(response.ok)
            return response.json();
        throw new Error(response?.status);
    }).then(json => {
        return {status: 'OK', response: json};
    }).catch(error => {
        return {status: 'ERROR', message: Errors[error.message] || 'Unknown error'};
    });
}