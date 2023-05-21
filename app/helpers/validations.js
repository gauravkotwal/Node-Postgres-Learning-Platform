import env from '../../env';
import { jwt } from 'jsonwebtoken';
import dotenv from 'dotenv';

/**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
const isValidEmail = (email) => {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
};

/**
   * validatePassword helper method
   * @param {string} password
   * @returns {Boolean} True or False
   */
const validatePassword = (password) => {
    if (password.length <= 5 || password === '') {
        return false;
    } return true;
};
/**
   * isEmpty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const isEmpty = (input) => {
    if (input === undefined || input === '') {
        return true;
    }
    if (input.replace(/\s/g, '').length) {
        return false;
    } return true;
};

/**
   * empty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const empty = (input) => {
    if (input === undefined || input === '') {
        return true;
    }
};

/**
   * generate user token
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const generateUserToken = (email, id, f_name, l_name, is_admin) => {
    const token = jwt.sign({
        email,
        userId: id,
        is_admin,
        f_name,
        l_name
    },
        process.env.SECRETEKY, { expiresIn: '2d' });
    return token;
};

export {
    isValidEmail,
    validatePassword,
    isEmpty,
    empty
};