const db = require('../initDB');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const getUsers = async () => {
    return db.task(async t => {
        const users = await t.any('SELECT id, uid, login, full_name, is_admin FROM users');
        return users;
    })
}

const addUser = async (userData) => {
    userData.password = bcrypt.hashSync(userData.password, 10);

    return db.task(async t => {
        await t.none('INSERT INTO users (uid, login, password, full_name, is_admin) VALUES ($1, $2, $3, $4, $5)', [(new Date()).getTime().toString(36), userData.login, userData.password, userData.full_name, userData.is_admin])
        .catch((error) => {
            console.log(error);
            throw new Error('SOMETHING_WENT_WRONG');
        });
    })
}

const changePassword = async(user) => {
    user.password = bcrypt.hashSync(user.password, 10);

    return db.task(async t => {
        await t.none('UPDATE users SET password = $1 WHERE id = $2', [user.password, user.id])
        .catch((error) => {
            console.log(error);
            throw new Error('SOMETHING_WENT_WRONG');
        });
    })
}

const loginUser = async (userData) => {
    return db.task(async t => {
        const user = await t.any('SELECT * FROM users LEFT JOIN images ON users.avatar_image = images.image_id WHERE login = $1', [userData.login]);
        if(user && user.length == 1){
            if(bcrypt.compareSync(userData.password, user[0].password)){
                let token = jwt.sign(user[0], config.private_key);

                const {login, full_name, id, is_admin, path} = user[0];

                return {login, full_name, token, id, is_admin, avatar_image: path};
            }
            else{
                throw new Error('WRONG_PASSWORD');
            }
        }
        else{
            throw new Error('USER_NOT_FOUND');
        }
    })
}

const updateUser = async(user) => {
    return db.task(async t => {
        await t.none('UPDATE users SET login = $1, full_name = $2, is_admin = $3, avatar_image = $4 WHERE id = $5', [user.login, user.full_name, user.is_admin, user.image, user.id]).catch((error) => {
            console.log(error);
            throw new Error('SOMETHING_WENT_WRONG');
        });
    })
}

const deleteUser = async (userID) => {
    return db.task(async t => {
        await t.none('DELETE FROM users WHERE id = $1', [userID])
        .catch((error) => {
            console.log(error);
            throw new Error('SOMETHING_WENT_WRONG');
        });
    })
}


module.exports = {
    getUsers,
    addUser,
    loginUser,
    updateUser,
    deleteUser,
    changePassword
}