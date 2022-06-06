const jwt = require("jsonwebtoken");
const { token } = require("morgan");
const SECRET_KEY = "supersecretprivatekey";

const signArgs = (data, key) => {
  const settings = {
    algorithm: "HS256",
    expiresIn: "10000",
  };
  return [data, key, settings];
};

const jwtGen = (data) => jwt.sign(...signArgs(data, SECRET_KEY));
const jwtCheck = (tok) => jwt.verify(tok, SECRET_KEY);

const testTokens = () => {
  const user = { email: "user@example.com" };
  const token = jwtGen(user);
  console.log("token:", token, jwtCheck(token));
};

testTokens();
// const encoder = (str) => {
//   console.log("str", str);

//   const encoded = Buffer.from(str).toString("base64");
//   console.log("encoded:", encoded);

//   const decoded = Buffer.from(encoded, "base64").toString("utf8");
//   console.log("decoded", decoded);
// };
// encoder("string-to-encode");
