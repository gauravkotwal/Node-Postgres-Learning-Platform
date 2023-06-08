/******************************************************************************
 *  @Execution      : default node : cmd> nodemon dashboardController.js
 *  @description    : This file is control the logic
 * 
 *  @file           : BidMentor Backend Application
 *  @overview       : BidMentor is an innovative and interactive learning platform designed to revolutionize the way individuals acquire knowledge
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 01-June-2023
 ******************************************************************************/

/*
required files
*/
import moment from 'moment';
import dbQuery from '../db/dev/dbQuery';

import {
    hashPassword,
    comparePassword,
    isValidEmail,
    validatePassword,
    isEmpty,
    generateUserToken,
} from '../helpers/validations';

import { errorMessage, successMessage, status } from '../helpers/status';
import { Constants } from '../constants/constant';
import sendmail from '../config/sendMail';


/*********************************************************************************
* Create A Post
* @param {object} req
* @param {object} res
* @returns {object} reflection object
*********************************************************************************/
const addPost = async (req, res) => {
    const { content } = req.body;
    const { username, user_id } = req.user;

    // timestamp for user creation
    const created_on = moment(new Date());
    const updated_at = moment(new Date());

    // update the post into existing user
    const updatePostQuery = Constants.ADD_POST_QUERY;
    console.log("username & userID ", username, user_id)

    try {
        const { rows } = await dbQuery.query(updatePostQuery, [user_id, content, created_on, updated_at]);
        const dbResponse = rows[0];
        console.log("dbResponse ::::::: ", dbResponse)

        // If email doesn't exist
        if (!dbResponse) {
            errorMessage.error = 'User with this email does not exist';
            return res.status(status.notfound).send(errorMessage);
        }

        delete dbResponse.password;
        successMessage.data = dbResponse;
        successMessage.message = "Post added!";

        return res.status(status.created).send(successMessage);
    } catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
};



/*********************************************************************************
* Retrive All Post
* @param {object} req
* @param {object} res
* @returns {object} reflection object
*********************************************************************************/
const getAllPost = async (req, res) => {
    const { username, user_id } = req.user;

    // update the post into existing user
    const updatePostQuery = Constants.FETCH_ALL_POST_QUERY;

    try {
        const { rows } = await dbQuery.query(updatePostQuery, null);
        const dbResponse = rows;
        console.log("get all post data dbResponse ::::::: ", dbResponse)

        // If email doesn't exist
        if (!dbResponse) {
            errorMessage.error = 'No Record Found';
            return res.status(status.notfound).send(errorMessage);
        }

        delete dbResponse.password;
        successMessage.data = dbResponse;
        successMessage.message = "Fetched all the posts";

        return res.status(status.created).send(successMessage);
    } catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
};



/*********************************************************************************
* Delete a Post
* @param {object} req
* @param {object} res
* @returns {object} reflection object
*********************************************************************************/
const deletePost = async (req, res) => {
    const { username, user_id } = req.user;
    const { id } = req.body;

    // update the post into existing user
    const deletePostQuery = Constants.DELETE_POST_QUERY;

    try {
        const { rowCount } = await dbQuery.query(deletePostQuery, [id, user_id]);

        // If post doesn't exist in the table
        if (rowCount === 0) {
            const errorMessage = { error: 'Post with this id does not exist' };
            return res.status(status.notfound).send(errorMessage);
        }

        const successMessage = { message: 'Post deleted successfully' };
        return res.status(status.success).send(successMessage);
    } catch (error) {
        console.log(error);
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
};



/*********************************************************************************
* Update a Post
* @param {object} req
* @param {object} res
* @returns {object} reflection object
*********************************************************************************/
const updatePost = async (req, res) => {
    const { username, user_id } = req.user;
    const { id, newContent } = req.body;

    // update the post into existing user
    const deletePostQuery = Constants.UPDATE_POST_QUERY;

    try {
        const { rowCount } = await dbQuery.query(deletePostQuery, [newContent, moment(new Date()), id, user_id]);

        // If post doesn't exist in the table
        if (rowCount === 0) {
            const errorMessage = { error: 'Post with this id does not exist' };
            return res.status(status.notfound).send(errorMessage);
        }

        const successMessage = { message: 'Post update successfully' };
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
};



/*********************************************************************************
* Retrive Specific Post
* @param {object} req
* @param {object} res
* @returns {object} reflection object
*********************************************************************************/
const getSpecificPost = async (req, res) => {
    const { username, user_id } = req.user;
    const { id } = req.body;

    // update the post into existing user
    const fetchPostQuery = Constants.FETCH_SPECIFIC_POST_QUERY;

    try {
        const { rows } = await dbQuery.query(fetchPostQuery, [id, user_id]);
        const dbResponse = rows[0];
        console.log("get specific post data dbResponse ::::::: ", dbResponse)

        // If email doesn't exist
        if (!dbResponse) {
            errorMessage.error = 'No Record Found';
            return res.status(status.notfound).send(errorMessage);
        }

        delete dbResponse.password;
        successMessage.data = dbResponse;
        successMessage.message = "Fetched Specific the posts";

        return res.status(status.created).send(successMessage);
    } catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
};



/*********************************************************************************
* Like Post
* @param {object} req
* @param {object} res
* @returns {object} reflection object
*********************************************************************************/
const likePost = async (req, res) => {
    const { username, user_id } = req.user;
    const { postId } = req.body;

    // update the post into existing user
    const likePostQuery = Constants.LIKE_POST_QUERY;

    try {
        const { rows } = await dbQuery.query(likePostQuery, [postId, user_id, moment(new Date())]);
        const dbResponse = rows[0];
        console.log("Like updated ::::::: ", dbResponse)

        // If email doesn't exist
        if (!dbResponse) {
            errorMessage.error = 'Please try again !!';
            return res.status(status.notfound).send(errorMessage);
        }

        successMessage.data = dbResponse;
        successMessage.message = "Post has been Liked";

        return res.status(status.created).send(successMessage);
    } catch (error) {
        if (error.routine === '_bt_check_unique') {
            errorMessage.error = 'This post is already liked';
            return res.status(status.conflict).send(errorMessage);
        }
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
};


export {
    addPost,
    getAllPost,
    deletePost,
    updatePost,
    getSpecificPost,
    likePost
};