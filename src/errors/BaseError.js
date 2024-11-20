class BaseError extends Error {
  constructor (message = "Internal server error", statusCode = 500) {
    super(message)
    this.message = message
    this.status = statusCode
  }

  sendResponse (res) {
    res.status(this.status).send({
      message: this.message,
      status: this.status
    })
  }
}

export default BaseError