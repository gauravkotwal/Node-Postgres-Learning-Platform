/******************************************************************************
 *  @Execution      : default node : cmd> nodemon server.js
 *  @description    : Root file for the server & control all the file and provide to required path
 * 
 *  @file           : BidMentor Backend Application
 *  @overview       : BidMentor is an innovative and interactive learning platform designed to revolutionize the way individuals acquire knowledge
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 22-may-2023
 ******************************************************************************/
/*
required files
*/
import express from 'express';
import 'babel-polyfill';
import cors from 'cors';
import usersRoute from './app/routes/userRoute';
const swaggerRoute = require('./swagger');

import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors());

// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use the Swagger route
app.use('/', swaggerRoute);


app.listen(process.env.PORT).on('listening', () => {
    console.log(`🚀 are live on ${process.env.PORT}`);
});


export default app;