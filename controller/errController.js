const AppError = require('./../utils/appError');

const handleCastError = err => {
    const message = `Invalid ${err.path} : ${err.value}`;
    return new AppError(message, 400);
}

const handleDupError = err => {
    let  message = '';
    if (err.keyValue.name) {
        message = `${err.keyValue.name} already exist plz try a new`;
        return new AppError(message, 400);
    } else if (err.keyValue.email) {
        message = `${err.keyValue.email} already exist plz try a new`;
        return new AppError(message, 400);
    } else {
        return new AppError(err.message, 400);
    }
    
}
const handleValError = err => {
    const message = `${err.message}`;
    return new AppError(message, 400);
}

const handleJWTError = (err) => {
    return new AppError('Un-authorize access! please log in ', 401);
}

const devErr = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack:err.stack
    });
};

const prodErr = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        console.error('Error 😱', err);
        res.status(500).json({
            status: "Error 😱",
            message: "Something went wrong!"
        });
    }
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Error';
    if (process.env.NODE_ENV ==='development') {
        devErr(err,res)
    } else if (process.env.NODE_ENV === 'production') {

        // let error = { ...err };

        if (err.name === "CastError") err = handleCastError(err);
        if (err.code === 11000) err = handleDupError(err);
        if (err.name === 'ValidationError') err = handleValError(err);
        if (err.name === 'JsonWebTokenError' || err.name==='TokenExpiredError') err = handleJWTError(err);
        prodErr(err, res);
}
    
}