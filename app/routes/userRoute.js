/******************************************************************************
 *  @Execution      : default node : cmd> nodemon userRoute.js
 *  @description    : This file is used to create the AOI endpoints (route)
 * 
 *  @file           : BidMentor Backend Application
 *  @overview       : BidMentor is an innovative and interactive learning platform designed to revolutionize the way individuals acquire knowledge
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 22-may-2023
 ******************************************************************************/

/*
required files
*/
import express from 'express';

import { createUser, siginUser } from '../controllers/usersController';
import verifyAuth from '../helpers/verifyAuth';

const router = express.Router();

// buses Routes

router.post('/signUp', verifyAuth, createUser);
router.get('/login', verifyAuth, siginUser);
export default router;