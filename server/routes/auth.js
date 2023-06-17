const {Router} = require('express');
const { TokenExpiredError } = require('jsonwebtoken');
const { getUsers, addUser, loginUser } = require('../controllers/users');

const router = Router();

router.post('/login', async (req, res) => {
    try{
        let {login, password} = req.body;

        if(login && password){
            res.status(200).json(await loginUser({login, password}));
        }
    }
    catch(error){
        res.status(400).json({status: 'ERROR', message: error.message});
    }
});


router.post('/register', async (req, res) => {
   try{
        if(req.body.login && req.body.password){
            await addUser({login: req.body?.login, password: req.body?.password, full_name: req.body?.full_name ?? req.body?.login, is_admin: req.body?.is_admin ?? false}, res);
            res.status(201).json({status: 'OK', message: 'User added'});
        }
        else{
            res.status(400).json({status: 'ERROR', message: 'INVALID DATA'});
        }
   }
    catch(error){
        console.log(error);
        res.status(400).json({status: 'ERROR', message: error.message});
    }
});

module.exports = router;