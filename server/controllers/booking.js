const { resolve } = require('bluebird');
const db = require('../initDB');
const moment = require('moment');
const { getRoomsAvailability } = require('./resources');

const getDatatimeFormat = (date) => {
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
};

const addEvent = async (event) => {
    let availableRooms = await getRoomsAvailability(event.start_time, event.end_time);

    let roomStatus = availableRooms?.filter(room => room?.id === event?.room_id);

    if(roomStatus?.length > 0 && roomStatus[0] != undefined && roomStatus[0]?.available === false)
        throw new Error('ROOM_OCCUPIED');


    return db.task(async t => {
        await t.none('INSERT INTO reservations (event_name, event_room, event_owner, event_start_time, event_end_time, event_status) VALUES ($1, $2, $3, $4, $5, $6)', [event.name, event.room_id, event.owner, getDatatimeFormat(event.start_time), getDatatimeFormat(event.end_time), 1]).catch((error) => {
            console.log(error);
            throw new Error('SOMETHING_WENT_WRONG');
        });
    });
}

const getAllReservations = async (userID) => {
    return db.task(async t => {
        const reservations = await t.any('SELECT * FROM (SELECT * FROM reservations WHERE event_end_time >= NOW()) AS res LEFT JOIN (SELECT id,full_name from users) as u ON res.event_owner = u.id LEFT JOIN (SELECT id,room_name from rooms) AS r ON res.event_room = r.id ORDER BY res.event_start_time, res.event_end_time ASC');
        if (userID)
            return reservations.filter(reservation => reservation.event_owner === userID);
        return reservations;
    });
}

const cancelReservation = async(event_id) =>{
    return db.task(async t=> {
        await t.none('UPDATE reservations SET event_status = 0 WHERE reservation_id = $1', [event_id]).catch(error => {
            console.log(error);
            throw new Error('SOMETHING_WENT_WRONG');
        });
    });
}


const cancelReservationsForRoom = async(room_id) => {
    return db.task(async t=> {
        await t.none('UPDATE reservations SET event_status = 0 WHERE event_room = $1', [room_id]).catch(error => {
            console.log(error);
            throw new Error('SOMETHING_WENT_WRONG');
        })
    });
}
module.exports = {
    addEvent,
    getDatatimeFormat,
    getAllReservations,
    cancelReservation,
    cancelReservationsForRoom
}