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
    const { post } = req.body;
    const { user_name, user_id } = req.user;

    // update the post into existing user
    const updatePostQuery = Constants.ADD_POST_QUERY;
    console.log("updatePostQuery ::::::: ", updatePostQuery)

    try {
        const { rows } = await dbQuery.query(updatePostQuery, [post, user_name, user_id]);
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
        if (error.routine === '_bt_check_unique') {
            errorMessage.error = 'User with that EMAIL already exist';
            return res.status(status.conflict).send(errorMessage);
        }
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
};


export {
    addPost
};