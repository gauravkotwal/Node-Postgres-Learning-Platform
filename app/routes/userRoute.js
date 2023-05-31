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
import {
    createUser,
    siginUser,
    deleteUser,
    getAllUser,
    verification,
    forgotPassword,
    resetPassword
} from '../controllers/usersController';
import verifyAuth from '../helpers/verifyAuth';

const router = express.Router();

router.post('/signUp', createUser);
router.post('/login', siginUser);
router.post('/delete', deleteUser);
router.get('/fetch-all-users', getAllUser);
router.get('/verification', verifyAuth, verification);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', verifyAuth, resetPassword);
router.post('/addpost', addPost);
router.post('/get-all-post', getAllPost);
// router.get('/sso-login', verifyAuth, siginUser);

export default router;
