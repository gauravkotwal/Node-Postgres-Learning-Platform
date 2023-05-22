/******************************************************************************
 *  @Execution      : default node : cmd> nodemon swagger.js
 *  @description    : Create Swagger for all the API endpoints
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
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const specs = require('../../swagger');

const router = express.Router();

// Serve the Swagger UI at /api-docs
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = router;
