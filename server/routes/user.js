import express from 'express';
// controllers
import user from '../controllers/user.js';

// middlewares

import {decode} from '../middlewares/jwt.js';

const router = express.Router();

router
    .get('/', decode, user.onGetAllUsers)
    .post('/', user.onCreateUser)
    .get('/:id', user.onGetUserById)
    .delete('/:id', user.onDeleteUserById)
    

export default router;