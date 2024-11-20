import mongoose from "mongoose";
import BaseError from "../errors/BaseError.js"

// eslint-disable-next-line no-unused-vars
function errorHandler (error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    res.status(400).send({message: "One or more data provided is incorrect."});
  } else if (error instanceof mongoose.Error.ValidationError) {
    const errorMessages = Object.values(error.errors)
      .map(error => error.message)
      .join("; ")

    res.status(400).send({message: `Errors found: ${errorMessages}`})
  } else {
    new BaseError().sendResponse(res)
  }
}

export default errorHandler