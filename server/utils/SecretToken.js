require("dotenv").config();
const jwt = require("jsonwebtoken");

export const CreateSecretToken = (id) => {
  return jwt.sign({ id }, "sbdbjsf", {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
