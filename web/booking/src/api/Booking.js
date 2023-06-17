import { Errors } from "./Errors";


export const AddEvent = (token, event) => {
    return fetch('http://localhost:3001/reservations/addevent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            event: event,
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


export const GetAllReservations = (token, userID = null) => {
    return fetch('http://localhost:3001/reservations/getallreservations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            userID: userID
        })}).then(response => {
            if(response.ok)
                return response.json();
            throw new Error(response?.status);
        }).then(json => {
            return {status: 'OK', response: json};
        }).catch(error => {
            console.log(error);
            return {status: 'ERROR', message: Errors[error.message] || 'Unknown error'};
        });
}

export const CancelReservation = (token, event_id) =>{
    return fetch('http://localhost:3001/reservations/cancelreservation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            event_id: event_id,
        })}).then(response => {
            if(response.ok)
                return response.json();
            throw new Error(response?.status);
        }).then(json => {
            return {status: 'OK', response: json};
        }).catch(error => {
            return {status: 'ERROR', message: Errors[error.message] || 'Unknown error'};
        });
}