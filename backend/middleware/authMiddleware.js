import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

//Protect routes
const protect = asyncHandler(async (req, res, next) => {
    let token;

    //Read the JWT from the cookies  //Here we are using req.cookies.jwt because we have the token with the name of "jwt".
    token = req.cookies.jwt;

    if (token) {
        try {
            //it will verify the token and give us the user object which has userId // we dont need the password
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //req object will be in all of our routes  // then we will get the user
            req.user = await User.findById(decoded.userId).select('-password');
            //next to next middleware
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized')
        }

    } else {
        res.status(401);
        throw new Error('Not authorized, no token')
    }
}); 


//Admin middleware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as admin')
    }
};

export { protect, admin }