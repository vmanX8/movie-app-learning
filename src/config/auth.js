require("dotenv").config();

const JWT_secret = process.env.JWT_SECRET || "super-secret-key"; // Educational purposes only, dotenv should be used for secret management

module.exports = {
  JWT_secret
};