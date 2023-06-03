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


export {
    addPost,
    getAllPost
};