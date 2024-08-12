import mysql from "serverless-mysql";

// Initialize dotenv to load environment variables
require("dotenv").config();

// Create a MySQL connection pool using environment variables
export const pool = mysql({
  config: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});
