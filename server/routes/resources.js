const {Router} = require('express');
const { getRooms, deleteRoom, addResource, addImage, updateResource, getEquipment, deleteEquipment,  getRoomsAvailability, getRoomEquipment } = require('../controllers/resources');
const multer = require("multer");
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage});

const router = Router();

router.get('/getrooms', async (req, res) => {
    try{
         let rooms = await getRooms();
         res.status(201).json({status: 'OK', message: 'Rooms fetched', rooms: rooms});
    }
     catch(error){
         res.status(400).json({status: 'ERROR', message: error.message});
     }
 });

 router.post('/getroomsavailability', async (req, res) => {
    try{
        if(req.body.start_time && req.body.end_time){
            let rooms = await getRoomsAvailability(req.body.start_time, req.body.end_time);
            res.status(201).json({status: 'OK', message: 'Rooms avability fetched', rooms: rooms});
        }
        else{
            res.status(400).json({status: 'ERROR', message: 'INVALID_DATA', data: req.body});
        }
    }
     catch(error){
            console.log(error);
         res.status(400).json({status: 'ERROR', message: error.message});
     }
 });

 router.get('/getequipment', async (req, res) => {
    try{
         let equipment = await getEquipment();
         res.status(201).json({status: 'OK', message: 'Equipment fetched', equipment: equipment});
    }
     catch(error){
         res.status(400).json({status: 'ERROR', message: error.message});
     }
 });


 router.post('/getroomequipment', async (req, res) => {
    try{
        let roomID = req.body.room_id;
        if(roomID){
            let equipment = await getRoomEquipment(roomID);
            res.status(201).json({status: 'OK', message: 'Equipment fetched', equipment: equipment});
        }
        else{
            res.status(400).json({status: 'ERROR', message: 'INVALID_DATA', data: req.body});
        }
   }
    catch(error){
        res.status(400).json({status: 'ERROR', message: error.message});
    }
 });

 router.post('/deleteroom', async (req, res) => {
    try{
        let roomID = req.body.room_id;
        if(roomID){
            await deleteRoom(roomID);
            res.status(201).json({status: 'OK', message: 'Room deleted'});
        }
        else{
            res.status(400).json({status: 'ERROR', message: 'INVALID_DATA', data: req.body});
        }
   }
    catch(error){
        res.status(400).json({status: 'ERROR', message: error.message});
    }
 });

 router.post('/deleteequipment', async (req, res) => {
    try{
        let equipmentID = req.body.equipment_id;

        if(equipmentID){
            await deleteEquipment(equipmentID);
            res.status(201).json({status: 'OK', message: 'Equipment deleted'});
        }
        else{
            res.status(400).json({status: 'ERROR', message: 'INVALID_DATA', data: req.body});
        }
   }
    catch(error){
        res.status(400).json({status: 'ERROR', message: error.message});
    }
 });

 router.post('/addresource', async(req, res) => {
    try{
        let resource = req.body.resource;
        if(resource){
            await addResource(resource);
            res.status(201).json({status: 'OK', message: 'Resource added'});
        }
        else{
            res.status(400).json({status: 'ERROR', message: 'INVALID_DATA', data: req.body});
        }
   }
    catch(error){
        res.status(400).json({status: 'ERROR', message: error.message});
    }
});

router.post('/updateresource', async(req, res) => {
    try{
        let resource = req.body.resource;
        if(resource){
            await updateResource(resource);
            res.status(201).json({status: 'OK', message: 'Resource updated'});
        }
        else{
            res.status(400).json({status: 'ERROR', message: 'INVALID_DATA', data: req.body});
        }
   }
    catch(error){
        res.status(400).json({status: 'ERROR', message: error.message});
    }
});

router.post("/uploadimage", async (req, res) => {
    try{
        const uploading = upload.single("file");
        uploading(req, res, async function (err, result) {
            if (err instanceof multer.MulterError) {
                console.log(err, "multer error");
                throw new Error('SOMETHING_WENT_WRONG');
            } else if (err) {
                console.log(err, "error")
                throw new Error('SOMETHING_WENT_WRONG');
            }

            if(req.file.filename){
                let result = await addImage({name: req.file.filename, path: req.file.path});

                if(result != undefined){
                    res.status(201).json({status: 'OK', message: 'Image added', image_id: result});
                }
                else{
                    throw new Error('SOMETHING_WENT_WRONG');
                }
            }
            else{
                throw new Error('SOMETHING_WENT_WRONG');
            }
        });
    }
    catch(error){
        res.status(400).json({status: 'ERROR', message: error.message});
    }
});

module.exports = router;