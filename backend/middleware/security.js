const jwt = require("jsonwebtoken");
const { CRYPT_KEY } = require("../config");

const { UnauthorizedError } = require("../utils/errors");

const jwtFrom = ({ headers }) => {
  if (headers?.authorization) {
    const [scheme, token] = headers.authorization.split(" ");
    if (scheme.trim() === "Bearer") {
      return token;
    }
  }
  return undefined;
};

const setJwt = (req, res, next) => {
  try {
    const tok = jwtFrom(req);

    if (tok) {
      res.locals.user = jwt.verify(tok, CRYPT_KEY);
    }
    return next();
  } catch (error) {
    return next();
  }
};

const enforceJwt = (req, res, next) => {
  try {
    const { user } = res.locals;
    console.log(user);
    if (!user?.email) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  setJwt,
  enforceJwt,
};
