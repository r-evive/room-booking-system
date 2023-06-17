const { resolve } = require('bluebird');
const db = require('../initDB');
const moment = require('moment');
const { cancelReservationsForRoom } = require('./booking');

const getDatatimeFormat = (date) => {
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
};


const getRooms = async () => {
    return db.task(async t => {
        const rooms = await t.any('SELECT * FROM rooms LEFT JOIN images ON rooms.image = images.image_id ORDER BY rooms.id');
        return rooms;
    })
}

const getRoomsAvailability = async (start_time, end_time) => {
    return db.task(async t => {

        const availiableRoms = await t.any(`
        SELECT * FROM (
        SELECT id, room_name, capacity, active, image, false as available FROM rooms WHERE id IN(SELECT event_room FROM reservations WHERE 
            event_status = 1 AND (($1 <= event_start_time AND $2 > event_start_time)
            OR ($1 < event_end_time AND $2 > event_end_time)
            OR (event_start_time <= $1 AND event_end_time > $1)))
            UNION 
            SELECT id, room_name, capacity, active, image, true as available FROM rooms WHERE id NOT IN
            (SELECT event_room FROM reservations WHERE event_status = 1 AND (($1 <= event_start_time AND $2 > event_start_time) 
            OR ($1 < event_end_time AND $2 > event_end_time)   
            OR (event_start_time <= $1 AND event_end_time > $1)))) AS t1 LEFT JOIN images AS t2 ON t1.image = t2.image_id`, [getDatatimeFormat(start_time), getDatatimeFormat(end_time)]);
        return availiableRoms;
    })
}


const getEquipment = async () => {
    return db.task(async t => {
        const equipment = await t.any('SELECT * FROM equipment LEFT JOIN images ON equipment.image = images.image_id ORDER BY equipment.id');
        return equipment;
    })
}

const getRoomEquipment = async (roomID) => {
    return db.task(async t => {
        const roomEquipment = await t.any('SELECT * FROM rooms_equipment LEFT JOIN equipment ON rooms_equipment.equipment_id = equipment.id LEFT JOIN images ON equipment.image = images.image_id WHERE room_id = $1 ORDER BY equipment.id ', [roomID]);
        return roomEquipment;
    })
}
const deleteRoom = async (roomID) => {
    return db.task(async t => {
        await t.none('DELETE FROM rooms WHERE id = $1', [roomID])
        .catch((error) => {
            console.log(error);
            throw new Error('SOMETHING_WENT_WRONG');
        });
        await cancelReservationsForRoom(roomID);
        await deleteEquipementByRoomID(roomID);
    })
}

const deleteEquipment = async (equipmentID) => {
    return db.task(async t => {
        await t.none('DELETE FROM equipment WHERE id = $1', [equipmentID])
        .catch((error) => {
            console.log(error);
            throw new Error('SOMETHING_WENT_WRONG');
        });
        await deleteEquipementByEquipmentID(equipmentID);
    })
}

const deleteEquipementByRoomID = async (roomID) => {
    return db.task(async t => {
        await t.none('DELETE FROM rooms_equipment WHERE room_id = $1', [roomID])
        .catch((error) => {
            console.log(error);
            throw new Error('SOMETHING_WENT_WRONG');
        });
    })
}

const deleteEquipementByEquipmentID = async (equipmentID) => {
    return db.task(async t => {
        await t.none('DELETE FROM rooms_equipment WHERE equipment_id = $1', [equipmentID])
        .catch((error) => {
            console.log(error);
            throw new Error('SOMETHING_WENT_WRONG');
        });
    })
}



const addResource = async(resource) => {
    if(resource?.type == 'Room'){
        return db.task(async t => {
            let roomID = await t.one('INSERT INTO rooms (room_name, capacity, image) VALUES ($1, $2, $3) RETURNING id', [resource.name, resource.capacity, resource.image]).catch((error) => {
                console.log(error);
                throw new Error('SOMETHING_WENT_WRONG');
            });
            console.log(roomID);
            console.log(resource);
            await addEquipmentToRoomsEquipment(resource.selectedEquipment, roomID.id);
        })
    }
    else if(resource?.type == 'Equipment'){
        return db.task(async t => {
            await t.none('INSERT INTO equipment (equipment_name, image) VALUES ($1, $2)', [resource.name, resource.image]).catch((error) => {
                console.log(error);
                throw new Error('SOMETHING_WENT_WRONG');
            });
        })
    }
}

const addEquipmentToRoomsEquipment = async (selectedArray, roomID) => {
    selectedArray.forEach(async (equipmentID) => {
        await insertEquipmentSelected(equipmentID, roomID);
    });
}


const insertEquipmentSelected = (equipmentID, roomID) => {
    return db.task(async t => {
        await t.none('INSERT INTO rooms_equipment (room_id, equipment_id) VALUES ($1, $2)', [roomID, equipmentID]).catch((error) => {});
    });
}

const updateResource = async(resource) => {
    if(resource?.type == 'Room'){
        return db.task(async t => {
            await t.none('UPDATE rooms SET room_name = $1, capacity = $2, image = $3 WHERE id = $4', [resource.name, resource.capacity, resource.image, resource.id]).catch((error) => {
                console.log(error);
                throw new Error('SOMETHING_WENT_WRONG');
            });
            console.log(resource);
            await deleteEquipementByRoomID(resource.id);
            await addEquipmentToRoomsEquipment(resource.selectedEquipment, resource.id);

        })
    }
    else if(resource?.type == 'Equipment'){
        return db.task(async t => {
            await t.none('UPDATE equipment SET equipment_name = $1, image = $2 WHERE id = $3', [resource.name, resource.image, resource.id]).catch((error) => {
                console.log(error);
                throw new Error('SOMETHING_WENT_WRONG');
            });
        })
    }
}

const addImage = async(image) =>{
    return db.task(async t => {
        let result = await t.one('INSERT INTO images (name, path) VALUES ($1, $2) RETURNING image_id', [image.name, image.path]).catch((error) => {
            console.log(error);
            throw new Error('SOMETHING_WENT_WRONG');
        });

        return result.image_id;
    })
}
module.exports = {
    getRooms,
    getEquipment,
    deleteRoom,
    deleteEquipment,
    addResource,
    updateResource,
    addImage,
    getRoomsAvailability,
    getRoomEquipment
}