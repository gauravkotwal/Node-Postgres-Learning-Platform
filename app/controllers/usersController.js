/******************************************************************************
 *  @Execution      : default node : cmd> nodemon usersController.js
 *  @description    : This file is control the logic
 * 
 *  @file           : BidMentor Backend Application
 *  @overview       : BidMentor is an innovative and interactive learning platform designed to revolutionize the way individuals acquire knowledge
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.1
 *  @since          : 19-may-2023
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


/*********************************************************************************
* Create A User
* @param {object} req
* @param {object} res
* @returns {object} reflection object
*********************************************************************************/
const createUser = async (req, res) => {
    const { email, first_name, last_name, password } = req.body;

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
        delete dbResponse.password;

        // A token has been generated for the logged-in user and attached into response
        const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.first_name, dbResponse.last_name);
        successMessage.data = dbResponse;
        successMessage.data.token = token;

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


/***********************************************************************************
* delete
* @param {object} req
* @param {object} res
* @returns {object} user object
**********************************************************************************/
const deleteUser = async (req, res) => {
    const { email } = req.body;

    // Email check
    if (!email) {
        const errorMessage = { error: 'Email is missing' };
        return res.status(status.bad).send(errorMessage);
    }

    // db query used to delete the existing user
    const deleteUserQuery = Constants.DELETE_QUERY;

    try {
        const { rowCount } = await dbQuery.query(deleteUserQuery, [email]);

        // If email doesn't exist in the table
        if (rowCount === 0) {
            const errorMessage = { error: 'User with this email does not exist' };
            return res.status(status.notfound).send(errorMessage);
        }

        const successMessage = { message: 'User deleted successfully' };
        return res.status(status.success).send(successMessage);
    } catch (error) {
        const errorMessage = { error: 'Operation was not successful' };
        return res.status(status.error).send(errorMessage);
    }
};


/***********************************************************************************
* fetch all the users
* @param {object} req
* @param {object} res
* @returns {object} user object
**********************************************************************************/
const getAllUser = async (req, res) => {

    // db query used to delete the existing user
    const getAllUserQuery = Constants.GETALLUSER_QUERY;

    try {
        const { rows, rowCount } = await dbQuery.query(getAllUserQuery, null);

        // If email doesn't exist in the table
        if (rowCount === 0) {
            const errorMessage = { error: 'No Record Found' };
            return res.status(status.notfound).send(errorMessage);
        }

        // response strucutre
        const finalResponse = [];

        rows.map(req => {
            finalResponse.push({
                userName : `${req.first_name} ${req.last_name}`,
                email : req.email,
                requestedDate : req.created_on
            })
        })

        const successMessage = { data: [...finalResponse] };
        return res.status(status.success).send(successMessage);
    } catch (error) {
        const errorMessage = { error: 'Operation was not successful' };
        return res.status(status.error).send(errorMessage);
    }
};


/***********************************************************************************
* signin
* @param {object} req
* @param {object} res
* @returns {object} user object
**********************************************************************************/
const siginUser = async (req, res) => {
    const { email, password } = req.body;
    if (isEmpty(email) || isEmpty(password)) {
        errorMessage.error = 'Email or Password detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    if (!isValidEmail(email) || !validatePassword(password)) {
        errorMessage.error = 'Please enter a valid Email or Password';
        return res.status(status.bad).send(errorMessage);
    }

    // will update all the queries in separet constant file
    const signinUserQuery = Constants.LOGIN_QUERY;
    try {
        const { rows } = await dbQuery.query(signinUserQuery, [email]);
        const dbResponse = rows[0];
        if (!dbResponse) {
            errorMessage.error = 'User with this email does not exist';
            return res.status(status.notfound).send(errorMessage);
        }
        if (!comparePassword(dbResponse.password, password)) {
            errorMessage.error = 'The password you provided is incorrect';
            return res.status(status.bad).send(errorMessage);
        }

        // In next PR will also update these files
        const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.is_admin, dbResponse.first_name, dbResponse.last_name);
        delete dbResponse.password;
        successMessage.data = dbResponse;
        successMessage.data.token = token;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
};


export {
    createUser,
    siginUser,
    deleteUser,
    getAllUser
};