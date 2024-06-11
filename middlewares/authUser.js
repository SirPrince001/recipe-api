require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const {ValidationError , NotFoundError} = require('../helper/error')

const authMiddleware = async(request , response , next)=>{
    try {
        // accept user token
        let token =  request.headers.authorization;
        if (!token) {
            throw new ValidationError('Token is required');
        }
        // deocde and verify user token
        token = token.split(" ")[1]
        let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // check if user exist
        let user = await User.findOne({email :decodedToken.email})
        console.log(user.email)
        if (!user) {
            throw new NotFoundError(`User with email ${decodedToken.email} not found`);
        }
        request.user = decodedToken;
        next();

    } catch (error) {
        next(error)
    }
} 

module.exports = authMiddleware;