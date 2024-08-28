const AppError = require("./appError");


class UnauthorisedError extends AppError{
    constructor(){
        super(`User is Not authroised properly`,401);
    }
}

module.exports = UnauthorisedError;