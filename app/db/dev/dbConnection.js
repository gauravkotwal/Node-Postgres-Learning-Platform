/******************************************************************************
 *  @Execution      : default node : cmd> nodemon dbConnection.js
 *  @description    : This file is used to write the DB queries
 * 
 *  @file           : BidMentor Backend Application
 *  @overview       : BidMentor is an innovative and interactive learning platform designed to revolutionize the way individuals acquire knowledge
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.2
 *  @since          : 19-may-2023
 ******************************************************************************/

/*
required files
*/
import pool from './pool';
import { Constants } from '../../constants/constant';

pool.on('connect', () => {
    console.log('connected to the db');
});

/**
 * Create User Table
 */
const createUserTable = () => {
    const userCreateQuery = Constants.TABLE_CREATION;

    pool.query(userCreateQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

/**
 * Drop User Table
 */
const dropUserTable = () => {
    const usersDropQuery = Constants.DROP_TABLE;
    pool.query(usersDropQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};


/**
 * Create All Tables
 */
const createAllTables = () => {
    createUserTable();
};


/**
 * Drop All Tables
 */
const dropAllTables = () => {
    dropUserTable();
};

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});


export {
    createAllTables,
    dropAllTables,
};

// we require make-runnable package - We need this to be able to call and any of our two functions from the terminal.
require('make-runnable');