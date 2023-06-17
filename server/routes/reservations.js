const {Router} = require('express');
const { addEvent, getAllReservations, cancelReservation } = require('../controllers/booking');
const router = Router();


router.post('/addevent', async (req, res) => {
    try{
        let event = req.body.event;
        if(event && Object.keys(event).length == 5){
            await addEvent(event);
            res.status(201).json({status: 'OK', message: 'Event added'});
        }
        else{
            res.status(400).json({status: 'ERROR', message: 'INVALID_DATA', data: req.body});
        }
   }
    catch(error){
        res.status(200).json({status: 'ERROR', message: error.message});
    }
 });

 router.post('/getallreservations', async (req, res) => {
    try{
        let reservations = await getAllReservations(req?.body?.userID);
        res.status(201).json({status: 'OK', message: 'Reservations fetched', reservations: reservations});
    }
    catch(error){
        res.status(400).json({status: 'ERROR', message: error.message});
    }
 });

 router.post('/cancelreservation', async (req, res) =>{
    try{
        let event_id = req.body.event_id;
        if(event_id){
            await cancelReservation(event_id);
            res.status(201).json({status: 'OK', message: 'Event canceled'});
        }
        else{
            res.status(400).json({status: 'ERROR', message: 'INVALID_DATA', data: req.body});
        }
   }
    catch(error){
        res.status(400).json({status: 'ERROR', message: error.message});
    }
 });
module.exports = router;