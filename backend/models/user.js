const { UnauthorizedError, BadRequestError } = require("../utils/errors");
const db = require("../db");

class User {
  static async login(credentials) {
    throw new UnauthorizedError("Invalid email/password combo");
  }
  static async register(credentials) {
    if (!credentials) {
      throw new BadRequestError(`Missing a request body`);
    }
    const requiredFields = ["email", "password", "firstname", "lastname"];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body`);
      }
    });
    if (credentials.email.indexOf("@") <= 0) {
      throw new BadRequestError(`Invalid email`);
    }

    const existingUser = await User.fetchUserByEmail(credentials.email);
    if (existingUser) {
      throw new BadRequestError(`Duplicate email: ${credentials.email}`);
    }

    const lowerCaseEmail = credentials.email.toLowerCase();

    const q = `
    INSERT INTO users (
      email,
      password,
      firstname,
      lastname
    )
    VALUES ($1, $2, $3, $4)
    RETURNING 
    id,
    email,
    password,
    firstname,
    lastname;
    `;
    console.log(requiredFields);
    let fields = requiredFields.map((f) => credentials[f]);

    fields[0] = lowerCaseEmail;
    const result = await db.query(q, fields);
    return result.rows[0];
  }

  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError("No email provided");
    }
    const q = `SELECT * FROM users WHERE email = $1`;
    const result = await db.query(q, [email.toLowerCase()]);
    const user = result.rows[0];
    return user;
  }
}

module.exports = User;
