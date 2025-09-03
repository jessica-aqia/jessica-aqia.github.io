const mysql = require("mysql2/promise");

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "selfpalette_projects",
  port: process.env.DB_PORT || 3306,
};

module.exports = dbConfig;
