const jwt = require("jsonwebtoken");
const { CRYPT_KEY } = require("../config");

const signArgs = (data, key) => {
  const settings = {
    algorithm: "HS256",
    expiresIn: "24h",
  };
  return [data, key, settings];
};

const jwtGen = (data) => jwt.sign(...signArgs(data, CRYPT_KEY));
const jwtCheck = (tok) => {
  try {
    const decoded = jwt.verify(tok, CRYPT_KEY);
    return decoded;
  } catch (e) {
    return {};
  }
};

const userJwt = (user) => {
  const payload = {
    email: user.email,
    isAdmin: user.isAdmin || false,
  };
  return jwtGen(payload);
};

module.exports = {
  jwtGen,
  jwtCheck,
  userJwt,
};
