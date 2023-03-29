import bcrypt from "bcrypt";
import { NextFunction, Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { cloneDeep } from "lodash";
import User from "../models/User";

const secret = String(process.env.JWT_SECRET);
export const auth = Router();

const comparePassword = async (plaintextPassword: string, hash: string) => {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
};

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.body._authenticatedUser = user;
    next();
  });
}

auth.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) return res.status(401).json({ error: "Email inválido" });

  if (!(await comparePassword(password, user.password)))
    return res.status(401).json({ error: "Senha inválida" });

  const userResponse = cloneDeep(user) as any;
  userResponse.password = undefined;

  const token = jwt.sign({ userResponse }, secret);

  res.json({ token });
});
