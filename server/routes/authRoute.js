import express from "express";
import { User } from "../models/UserModel.js";

const router = express.Router();

router.post("/", async (request, response) => {
    console.log(request.body);
  try {
    if (!request.body.email || !request.body.password) {
      return response.status(400).send({ message: "set all required field" });
    }
    const newUser = {
      email: request.body.email,
      password: request.body.password,
    };
    console.log(newUser);
    const user = await User.create(newUser);
    return response.status(201).send(user);
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

export default router;
