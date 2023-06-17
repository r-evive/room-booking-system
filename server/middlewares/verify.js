const jwt = require("jsonwebtoken")
const { private_key } = require("../config")

const verifyToken = (req, res, next)=>{
    const token = req.headers.authorization;
    if(token!=undefined){
        jwt.verify(token.split(' ')[1], private_key, function(err, decoded) {
            if(err){
                res.status(401).send({status: 'ERROR', message: 'UNAUTHORIZED'});
            }
            else{
                if(decoded!=undefined){
                    next();
                }
                else{
                    res.status(401).send({status: 'ERROR', message: 'UNAUTHORIZED'});
                }
            }
        });
    }
    else{
        res.status(401).send({status: 'ERROR', message: 'UNAUTHORIZED'});
    }
}

module.exports = verifyToken;