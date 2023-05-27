/******************************************************************************
 *  @Execution      : default node : cmd> nodemon userRoute.js
 *  @description    : This file is used to create the AOI endpoints (route)
 * 
 *  @file           : BidMentor Backend Application
 *  @overview       : BidMentor is an innovative and interactive learning platform designed to revolutionize the way individuals acquire knowledge
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.1
 *  @since          : 22-may-2023
 ******************************************************************************/

/*
required files
*/
import express from 'express';

import { createUser, siginUser, deleteUser, getAllUser, ssoLogin } from '../controllers/usersController';
import verifyAuth from '../helpers/verifyAuth';

const router = express.Router();

router.post('/signup', createUser);
router.delete('/login', verifyAuth, siginUser);
router.post('/delete', deleteUser);
router.get('/fetch-all-users', getAllUser);
router.post('/sso-login', verifyAuth, siginUser);
export default router;