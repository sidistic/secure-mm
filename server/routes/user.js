import express from 'express';
// controllers
import user from '../controllers/user.js';

// middlewares

import auth from '../middlewares/auth.js';

const router = express.Router();

router
    .get('/', auth.decode, user.onGetAllUsers)
    .post('/', user.onCreateUser)
    .post('/middleware-login-demo', auth.encode, (req, res, next) => {
        return res.status(200).json({ success: true,token: req.authToken, data: req.information })   
    })
    .get('/:id', user.onGetUserById)
    .delete('/:id', user.onDeleteUserById)
    

export default router;