const { createcart } = require("../repositories/cartRepository");
const { findUser, createUser } = require("../repositories/userRepository");

    async function registerUser(userDetails){
        console.log("Hitting service layer")
        console.log(userDetails);
        // it will create a brands new user in the do

        // 1. we need  to check if the user with this email and mobile
            const user = await findUser({
                email:userDetails.email,
                mobileNumber:userDetails.mobileNumber
            });

            if(user){
                throw{reason:'User with the given email and mobile number already exist',statusCode:400}
            }

        // 2. if not then create the user in the database
              const newUser = await createUser({
                email:userDetails.email,
                password:userDetails.password,
                firstName:userDetails.firstName,
                lastName:userDetails.lastName,
                mobileNumber:userDetails.mobileNumber
              });
              if(!newUser){
                throw {reason:'Something went wrong cannot create user',statusCode:500}
              }

            //  

              await createcart(newUser._id);

              
        // 3. return the details of created user
               return newUser;
    }


module.exports = {
    registerUser
}