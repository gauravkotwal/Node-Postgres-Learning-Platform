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
    const { email, message, like, bid, share } = req.body;

    // timestamp for user creation
    const created_on = moment(new Date());

    // Parameter Check
    if (isEmpty(email) || isEmpty(first_name) || isEmpty(last_name) || isEmpty(password)) {
        errorMessage.error = 'Email, password, first name and last name field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    // Email Validation
    if (!isValidEmail(email)) {
        errorMessage.error = 'Please enter a valid Email';
        return res.status(status.bad).send(errorMessage);
    }

    // Password alidation
    if (!validatePassword(password)) {
        errorMessage.error = 'Password must be more than five(5) characters';
        return res.status(status.bad).send(errorMessage);
    }

    // Password encryption
    const hashedPassword = hashPassword(password);

    // db query used to ingest a user with provided values
    const createUserQuery = Constants.REGISTER_QUERY;
    const values = [
        email,
        first_name,
        last_name,
        hashedPassword,
        created_on,
    ];

    try {
        const { rows } = await dbQuery.query(createUserQuery, values);
        const dbResponse = rows[0];

        // A token has been generated for the logged-in user and attached into response
        const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.first_name, dbResponse.last_name);

        delete dbResponse.password;
        successMessage.data = dbResponse;

        // User full name
        const userName = `"${successMessage.data.first_name} ${successMessage.data.last_name}"`;
        const subject = `Action Required: Verify Your Account for ${userName}`
        const url = `http://localhost:3000/v1/verification?token=${encodeURIComponent(token)}`;

        // sendmail for the verification
        sendmail.sendmailServices(url, subject);
        successMessage.message = "Signup email has been sent successfully! Please check your email and verify your account";

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