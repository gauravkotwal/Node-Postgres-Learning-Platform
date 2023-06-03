/******************************************************************************
 *  @Execution      : default node : cmd> nodemon postRoute.js
 *  @description    : This file is used to create the post related API endpoints (route)
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
import { addPost, getAllPost } from '../controllers/postsController';
import verifyAuth from '../helpers/verifyAuth';

const router = express.Router();

// Posts
router.post('/addpost', verifyAuth, addPost);
router.post('/get-all-post', verifyAuth, getAllPost);
// router.post('/get-specific-post', verifyAuth, addPost);
// router.post('/update-post', verifyAuth, addPost);
// router.post('/delete-post', verifyAuth, addPost);

// // Likes and Comments
// router.post('/like', verifyAuth, addPost);
// router.post('/unlike', verifyAuth, addPost);
// router.post('/addcomment', verifyAuth, addPost);
// router.post('/updatecomment', verifyAuth, addPost);
// router.post('/deletecomment', verifyAuth, addPost);

export default router;
