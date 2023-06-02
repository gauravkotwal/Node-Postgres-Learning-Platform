/******************************************************************************
 *  @Execution      : default node : cmd> nodemon verifyAuth.js
 *  @description    : This file is used to verify the user token
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
import jwt from 'jsonwebtoken';
const url = require('url');
import { errorMessage, status } from '../helpers/status';
import dotenv from 'dotenv';
dotenv.config();

/**
   * Verify Token
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */

const verifyToken = async (req, res, next) => {

  const paramToken = req.url.split("token=")[1];
  const { token } = req.headers;

  if (!token && !paramToken) {
    errorMessage.error = 'Token not provided';
    return res.status(status.bad).send(errorMessage);
  }
  try {
    const decoded = token ? jwt.verify(token, process.env.SECRET) : jwt.verify(paramToken, process.env.SECRET);
    console.log("token decoded ::::: ", decoded)

    req.user = {
      email: decoded.email,
      user_id: decoded.user_id,
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      user_name: decoded.user_name
    };
    next();
  } catch (error) {
    errorMessage.error = 'Authentication Failed';
    return res.status(status.unauthorized).send(errorMessage);
  }
};

export default verifyToken;