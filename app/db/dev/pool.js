/******************************************************************************
 *  @Execution      : default node : cmd> nodemon pool.js
 *  @description    : This file is used to connect the postgres database through server
 * 
 *  @file           : BidMentor Backend Application
 *  @overview       : BidMentor is an innovative and interactive learning platform designed to revolutionize the way individuals acquire knowledge
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 20-may-2023
 ******************************************************************************/

/*
required files
*/
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const databaseConfig = { connectionString: process.env.DATABASE_URL };
const pool = new Pool(databaseConfig);

export default pool;