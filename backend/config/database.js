require("dotenv").config();

module.exports = {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER || "root",
  PASSWORD: process.env.DB_PASSWORD || "",
  DB: process.env.DB_NAME || "giftcard",
  dialect: process.env.DB_DIALECT || "mysql",   // 👈 fallback
  pool: {
    max: 5,
    min: 0,
    acquire: 40000,
    idle: 10000,
  },
};
