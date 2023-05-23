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

import { createUser, siginUser } from '../controllers/usersController';
import verifyAuth from '../helpers/verifyAuth';

const router = express.Router();
/**
 * @swagger
 * /signUp:
 *   get:
 *     summary: Register new user
 *     description: user can create account.
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.post('/signUp', verifyAuth, createUser);

/**
 * @swagger
 * /login:
 *   get:
 *     summary: login
 *     description: user can login.
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.get('/login', verifyAuth, siginUser);
export default router;