const AppError = require('../utils/AppError');
const { ZodError } = require('zod');

exports.globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Handle Zod Validation Errors
  if (err instanceof ZodError) {
    const errorMessages = err.errors.map(el => el.message).join('. ');
    return res.status(400).json({
      status: 'fail',
      message: `Invalid input data: ${errorMessages}`
    });
  }

  // Handle Prisma Database Errors
  if (err.name === 'PrismaClientKnownRequestError') {
    if (err.code === 'P2002') {
      return res.status(409).json({
        status: 'fail',
        message: 'Duplicate database entry violation'
      });
    }
  }

  // Handle Expected Operational Errors
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }

  // Programming or unknown errors: don't leak error details
  console.error('ERROR 💥:', err);
  return res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!'
  });
};
