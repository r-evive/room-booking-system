const {Router} = require('express');
const bcrypt = require('bcrypt');
const { getUsers, updateUser, deleteUser, changePassword } = require('../controllers/users');

const router = Router();

router.get('/getusers', async (req, res) => {
    try{
         let users = await getUsers();
         res.status(201).json({status: 'OK', message: 'Rooms fetched', users: users});
    }
     catch(error){
         res.status(400).json({status: 'ERROR', message: error.message});
     }
 });


 router.post('/updateuser', async(req, res) => {
    try{
        if(req.body.login){
            await updateUser({id: req.body?.id, login: req.body?.login, full_name: req.body?.full_name ?? req.body?.login, is_admin: req.body?.is_admin ?? false, image: req.body?.image});
            res.status(201).json({status: 'OK', message: 'User updated'});
        }
        else{
            res.status(400).json({status: 'ERROR', message: 'INVALID_DATA', data: req.body});
        }
   }
    catch(error){
        res.status(400).json({status: 'ERROR', message: error.message});
    }
});

router.post('/deleteuser', async (req, res) => {
    try{
        let userID = req.body.user_id;
        if(userID){
            await deleteUser(userID);
            res.status(201).json({status: 'OK', message: 'User deleted'});
        }
        else{
            res.status(400).json({status: 'ERROR', message: 'INVALID_DATA', data: req.body});
        }
   }
    catch(error){
        res.status(400).json({status: 'ERROR', message: error.message});
    }
 });

 router.post('/changepassword', async(req, res) => {
    try{
        const {id, password } = req.body;
        if(id && password){
            await changePassword({id, password});
            res.status(201).json({status: 'OK', message: 'Password updated'});
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