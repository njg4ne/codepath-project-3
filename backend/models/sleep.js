const bcrypt = require("bcrypt");
const { UnauthorizedError, BadRequestError } = require("../utils/errors");
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");
const User = require("./user");

class Sleep {
  static checkArgFields(arg, fields) {
    if (!arg) {
      throw new BadRequestError(`Missing a request body`);
    }
    fields.forEach((field) => {
      if (!arg.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body`);
      }
    });
  }

  static async record(email, entry) {
    if (!email) {
      throw new BadRequestError("No email provided");
    }
    const requiredFields = ["start", "end", "notes", "email"];
    // console.log("E", entry);
    const data = { ...entry, email };
    Sleep.checkArgFields(data, requiredFields);

    if (entry.notes.length > 140) {
      throw new BadRequestError(`Sleep notes must be 140 characters or less.`);
    }

    const records = await Sleep.fetchSleepBetween(
      email,
      entry.start,
      entry.end
    );
    console.log(records?.length);
    if (records?.length > 0) {
      throw new BadRequestError(
        `Sleep has already been logged during that time.`
      );
    }

    const q = `
    INSERT INTO sleep (
      start_dt,
      end_dt,
      notes,
      user_id
    )
    VALUES ($1, $2, $3, (SELECT id FROM users WHERE email = $4))
    RETURNING 
      id,
      start_dt AS "start",
      end_dt AS "end",
      notes,
      user_id AS "userId";
    `;
    let fields = requiredFields.map((f) => data[f]);
    const result = await db.query(q, fields);
    return result.rows[0];
  }

  static async fetchSleepByEmail(email) {
    if (!email) {
      throw new BadRequestError("No email provided");
    }
    const q = `SELECT * FROM sleep WHERE user_id = (SELECT id FROM users WHERE email = $1);`;
    const result = await db.query(q, [email.toLowerCase()]);
    const sleep_entries = result.rows;
    return sleep_entries;
  }
  // static async fetchSleepBefore(email, date) {
  //   if (!email) {
  //     throw new BadRequestError("No email provided");
  //   }
  //   const q = `SELECT * FROM sleep WHERE user_id = (SELECT id FROM users WHERE email = $1) and start_dt < $2;`;
  //   const result = await db.query(q, [email.toLowerCase(), date]);
  //   const sleep_entries = result.rows;
  //   return sleep_entries;
  // }
  static async fetchSleepBetween(email, start, end) {
    const requiredFields = ["email", "start", "end"];
    const data = { email, start, end };
    Sleep.checkArgFields(data, requiredFields);

    const q = `SELECT * FROM sleep 
    WHERE user_id = (SELECT id FROM users WHERE email = $1)
     and ((
      start_dt <= $3 and start_dt >= $2
     ) or (
      end_dt <= $3 and end_dt >= $2
     ));`;
    const result = await db.query(q, [email.toLowerCase(), start, end]);
    const sleep_entries = result.rows;
    console.log(sleep_entries);
    return sleep_entries;
  }
}

module.exports = Sleep;
