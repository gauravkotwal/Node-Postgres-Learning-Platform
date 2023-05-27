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
/**
 * @swagger
 * /signUp:
 *   get:
 *     summary: Register user
 *     description: user can create account.
 *     responses:
 *       200:
 *         description: A list of users.
 */

//need to check on token verification on signup page
router.post('/signup', createUser);

/**
 * @swagger
 * /login:
 *   get:
 *     summary: login user
 *     description: user can login.
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.delete('/login', verifyAuth, siginUser);

/**
 * @swagger
 * /login:
 *   get:
 *     summary: delete user
 *     description: user can delete existing user.
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.post('/delete', deleteUser);

/**
 * @swagger
 * /fetchAllUser:
 *   get:
 *     summary: get all user
 *     description: user can check all the exising user details.
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.get('/fetch-all-users', getAllUser);

/**
 * @swagger
 * /sso-login:
 *   get:
 *     summary: login with token
 *     description: user can with token.
 *     responses:
 *       200:
 *         description: sso login.
 */
router.post('/sso-login', verifyAuth, siginUser);
export default router;