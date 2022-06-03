require("dotenv").config();
require("colors");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

function getDatabaseUri() {
  const user = process.env.DATABASE_USER || "postgres";
  const pw = process.env.DATABASE_PASS
    ? encodeURI(process.env.DATABASE_PASS)
    : "postgres";
  const host = process.env.DATABASE_HOST || "localhost";
  const p = process.env.DATABASE_PORT || 5432;
  const db = process.env.DATABASE_NAME || "database";

  return (
    process.env.DATABASE_URL || `postgresql://${user}:${pw}@${host}:${p}/${db}`
  );
}

const BCRYPT_WORK_FACTOR = 13;

console.log("App Storage Configuration:".red);
console.log("---------".yellow);
console.log("PORT:".blue, PORT);
console.log("Database URI".blue, getDatabaseUri());
console.log("---------".yellow);

module.exports = {
  PORT,
  getDatabaseUri,
  BCRYPT_WORK_FACTOR,
};
