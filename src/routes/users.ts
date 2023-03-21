import bcrypt from "bcrypt";
import express from "express";
import User from "../models/User";
import { createUserValidator } from "../validators/User";
import { validate } from "../validators/ValidatorHandler";
import { authenticateToken } from "./auth";

export const users = express.Router();

users.get("/users", authenticateToken, async (req, res) => {
  const users = await User.find();

  res.json(users);
});

users.post("/users", validate(createUserValidator), async (req, res) => {
  try {
    const user = new User(req.body);

    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

users.put("/users/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, req.body, { new: true });

  res.json(user);
});

users.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id);

  res.sendStatus(204);
});
