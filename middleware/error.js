const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  if (err.name === "CastError" || err.message === "CastError") {
    err = new ErrorResponse("Resource not found", 404);
  }
  if (err.message === "FileError") {
    err = new ErrorResponse("Please upload a file", 400);
  }
  if (err.message === "ImageError") {
    err = new ErrorResponse("Please upload an image file", 400);
  }
  if (err.message === "MaxFileUploadError") {
    err = new ErrorResponse(
      `Please upload an image less than ${process.env.MAX_FILE_UPLOAD} bytes`,
      400
    );
  }
  if (err.code === 11000) {
    err = new ErrorResponse("Duplicate field value entered", 400);
  }
  if (err.name === "ValidationError") {
    err = new ErrorResponse(
      Object.values(err.errors).map((value) => value.properties.message),
      400
    );
  }
  res.status(err.statusCode || 500).json({
    success: false,
    err: err.message || "Server error",
  });
};

module.exports = errorHandler;
