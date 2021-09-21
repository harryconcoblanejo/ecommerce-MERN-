import { Request, Response, NextFunction } from "express";
import User, { IUser, ROLE } from "../models/users/user";

export const checkDuplicateUsernameOrEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userName } = req.body;
  const user = await User.findOne({ userName: userName });

  if (user) return res.status(400).json({ message: "the user already exists" });

  const email = await User.findOne({ email: req.body.email });
  if (email)
    return res.status(400).json({ message: "the email already exists" });
  next();
};

export const checkRoles = (req: Request, res: Response, next: NextFunction) => {
  const { roles } = req.body;
  if (roles) {
    for (let i = 0; i < roles.length; i++) {
      if (!ROLE.includes(roles[i])) {
        return res
          .status(400)
          .json({ message: `Role ${roles} does not exists` });
      }
    }
  }
  next();
};
