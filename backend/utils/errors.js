class ExpressError extends Error {
  constructor(msg, status) {
    super();
    this.message = msg;
    this.status = status;
  }
}

class BadRequestError extends ExpressError {
  constructor(msg = "Bad Request") {
    super(msg, 400);
  }
}
class UnauthorizedError extends ExpressError {
  constructor(msg = "Unauthorized") {
    super(msg, 401);
  }
}
class ForbiddenError extends ExpressError {
  constructor(msg = "Forbidden") {
    super(msg, 403);
  }
}
class NotFoundError extends ExpressError {
  constructor(msg = "Not Found") {
    super(msg, 404);
  }
}

module.exports = {
  ExpressError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
};
