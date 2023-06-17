import { Errors } from "./Errors";

export const GetRooms = (token) => {
    return fetch('http://localhost:3001/resources/getrooms', {
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


export const GetRoomsAvability = (token, startTime, endTime) => {
    return fetch('http://localhost:3001/resources/getroomsavailability', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            start_time: startTime,
            end_time: endTime
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

export const GetEquipment = (token) => {
    return fetch('http://localhost:3001/resources/getequipment', {
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

export const getRoomEquipment = (token, roomID) => {
    return fetch('http://localhost:3001/resources/getroomequipment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({room_id: roomID})
    }).then(response => {
        if(response.ok)
            return response.json();
        throw new Error(response?.status);
    }).then(json => {
        return {response: json};
    }).catch(error => {
        console.log(error);
        return {status: 'ERROR', message: Errors[error.message] || 'Unknown error'};
    });
}

export const DeleteRoom = (token, roomID) => {
    return fetch('http://localhost:3001/resources/deleteroom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            room_id: roomID
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

export const DeleteEquipment = (token, equipmentID) => {
    return fetch('http://localhost:3001/resources/deleteequipment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            equipment_id: equipmentID
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

export const UploadResource = (token, resource) => {
    return fetch('http://localhost:3001/resources/addresource', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            resource: resource,
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

export const UpdateResource = (token, resource) => {
    return fetch('http://localhost:3001/resources/updateresource', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            resource: resource,
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

export const UploadImage = (token, image) => {
    return fetch('http://localhost:3001/resources/uploadimage', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + token
        },
        body: image
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