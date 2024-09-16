const jwt = require('jsonwebtoken');
const { JWT_SECRET, COOKIE_SECURE, } = require('../config/serverConfig');
const UnauthorisedError = require('../utils/unauthorisedError');

async function isLoggedIn(req, res, next){
    const token = req.cookies["authToken"];
    if(!token){
        return res.status(401).json({
            success:false,
            data:{},
            error:"Not authenticated",
            message:"No Auth Token provided"
        });
    }

    // *****
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded, decoded.exp, Date.now() / 1000);  // New Line Add
        
        if(!decoded){
            throw new UnauthorisedError();
        }
        // if reached here then user is authenticated allow then to access the api

      req.user={
        email:decoded.email,
        id:decoded.id,
        role:decoded.role
      }

      next();

    } catch (error) {
        console.log(error);
        if(error.name === "TokenExpiredError"){
            res.cookie("authToken", "", {
                httpOnly: true,
                sameSite: "lax",
                secure: COOKIE_SECURE,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                // domain: FRONTEND_URL
            });
            return res.status(200).json({
                success: true,
                message: "Log out successfull",
                error: {},
                data: {}
            });
        }

        // 
        return res.status(401).json({
            success:false,
            data:{},
            error:error,
            message:"Invalid Token provided"
        });
    }


}

/**
 *This Function checks if the authenticated user is an admin or not ?
 *Becuase we will call isAdmin after isLoggedIn thats why we will receiver user details
 *
 */

async function isAdmin(req, res, next) {
    const isLoggedInUser = req.user;
    // console.log(isLoggedInUser);
    if(isLoggedInUser.role === "ADMIN"){
        next();
    }else{
        return res.status(401).json({
            success:false,
            data:{},
            message:"Your are Not Authorised for this action",
            error:{
                statusCode:401,
                reason:"Unauthorised user for this action"
            }
        });
    }

}

module.exports ={
    isLoggedIn,
    isAdmin
}