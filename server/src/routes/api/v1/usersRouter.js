import express from "express";
import passport from "passport";
import objection from "objection";
import { ValidationError } from "objection";
import { User } from "../../../models/index.js";
import cleanUserInput from "../../../services/cleanUserInput.js";
import UserSerializer from "../../../serializers/UserSerializer.js";

const usersRouter = new express.Router();

usersRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.query().findById(userId);
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Error fetching user" });
  }
});

usersRouter.post("/", async (req, res) => {
  const formInput = cleanUserInput(req.body)
  const { email, password, passwordConfirmation } = formInput;
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    if (error instanceof ValidationError) {
    return res.status(422).json({ errors: error.data });
  }
  return res.status(500).json({ errors: error })
  }
});


export default usersRouter;
