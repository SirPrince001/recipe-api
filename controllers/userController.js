const Mongoose = require('mongoose');
const User = require('../models/user');
const Bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ValidationError, NotFoundError } = require('../helper/error')

//register a new user

exports.registerUser = async (request, response, next) => {

    try {
        //check if user email already exist 

        let userEmail = await User.findOne({ email: request.body.email });
        if (userEmail) {
            throw new ValidationError(`User email ${userEmail.email} already exist try different email`);
        }

        // accept input from user

        let { fullName, email, password } = request.body;
        // validate user input
        if (!fullName) {
            throw new ValidationError('fullname is required');

        }
        if (!email) {
            throw new ValidationError('email is required');
        }
        if (!password) {
            throw new ValidationError('password is required');
        }
        // hash password
        password = Bcrypt.hashSync(password, 10)

        // create new user
        const newUser = new User({
            fullName,
            email,
            password
        })

        // save user
        let userData = await newUser.save();
        userData = userData.toJSON()
        delete userData.password;
        return response.status(201).json({
            success: true,
            responseMessage: 'User created Successfully',
            data: userData
        })

    } catch (error) {
        next(error)
    }


}

// login user

exports.loginUser = async (request, response, next) => {
    try {
        let { email, password } = request.body;
        if (!email) {
            throw new ValidationError('email is required');
        }
        if (!password) {
            throw new ValidationError('password is required');
        }
        let user = await User.findOne({ email });
        if (!user) {
            throw new NotFoundError(`User with email ${email} not found`);
        }
        if (!Bcrypt.compareSync(password, user.password)) {
            throw new ValidationError('Invalid password');
        }
        user = user.toJSON();
        delete user.password;

        // create user payload
        const userPayload = {
            id: user._id,
            fullName: user.fullName,
            email: user.email
        }

        // generate user token
        const userToken = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: 86400 })

        return response.status(200).json({
            success: true,
            responseMessage: `User ${user.fullName} logged in Successfully`,
            data: {
                user: user,
                token: userToken
            }
        })
    } catch (error) {
        next(error)
    }
}

//get all users

exports.getAllUsers = async (request, response, next) => {
    try {
        let users = await User.find({}).select('-password');
        return response.status(200).json({
            success: true,
            responseMessage: 'All users',
            data: users
        })
    } catch (error) {
        next(error)
    }
}