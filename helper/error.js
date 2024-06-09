class CustomError extends Error {
    constructor(message) {
        super(message)
        this.statusCode = 500
    }
}

class ValidationError extends CustomError {
    constructor(message) {
        super(message)
        this.statusCode = 400
    }
}

class NotFoundError extends CustomError {
    constructor(message) {
        super(message)
        this.statusCode = 404
    }
}

module.exports = {
    ValidationError,
    NotFoundError
}