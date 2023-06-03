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
    const userCreateQuery = Constants.USER_TABLE_CREATION;
    console.log("userCreateQuery ::::: ", userCreateQuery);

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
 * Create user Post Table
 */
const userPostTable = () => {
    const userPostQuery = Constants.USER_POST_TABLE_CREATION;
    console.log("userPostQuery ::::: ", userPostQuery);

    pool.query(userPostQuery)
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
 * Create user Likes Table
 */
const userLikesTable = () => {
    const userLikeQuery = Constants.USER_LIKE_TABLE_CREATION;
    console.log("userLikeQuery ::::: ", userLikeQuery);

    pool.query(userLikeQuery)
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
 * Create user Comments Table
 */
const userCommentsTable = () => {
    const userCommentQuery = Constants.USER_COMMENT_TABLE_CREATION;
    console.log("userCommentQuery ::::: ", userCommentQuery);

    pool.query(userCommentQuery)
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
 * Create user Accounts Table
 */
const userAccountsTable = () => {
    const userAccountQuery = Constants.ACCOUNTS_TABLE_CREATION;
    console.log("userAccountQuery ::::: ", userAccountQuery);

    pool.query(userAccountQuery)
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
    userPostTable();
    userLikesTable();
    userCommentsTable();
    userAccountsTable();
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