/******************************************************************************
 *  @Execution      : default node : cmd> nodemon dbConnection.js
 *  @description    : This file is used to write the DB queries
 * 
 *  @file           : BidMentor Backend Application
 *  @overview       : BidMentor is an innovative and interactive learning platform designed to revolutionize the way individuals acquire knowledge
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 19-may-2023
 ******************************************************************************/

/*
required files
*/
import pool from './pool';

pool.on('connect', () => {
    console.log('connected to the db');
});

/**
 * Create User Table
 * CREATE TABLE test
  (id SERIAL PRIMARY KEY, 
  name VARCHAR(100) UNIQUE NOT NULL, 
  phone VARCHAR(100));
 */
const createUserTable = () => {
    const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
  (id SERIAL PRIMARY KEY, 
  email VARCHAR(100) UNIQUE NOT NULL, 
  first_name VARCHAR(100), 
  last_name VARCHAR(100), 
  password VARCHAR(100) NOT NULL,
  created_on DATE NOT NULL)`;

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
    const usersDropQuery = 'DROP TABLE IF EXISTS users';
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