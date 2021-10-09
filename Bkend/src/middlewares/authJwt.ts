import { Request, Response, NextFunction, RequestHandler } from "express";

import jwt from "jsonwebtoken";
import User, { IUser } from "../models/users/user";
import Role from "../models/roles/role";

import config from "../config";

interface IDecoded {
  id: string;

  iat: number;
  exp: number;
}

export interface IRequest extends Request {
  userData?: string;
}

export const verifyToken = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers
      .authorization as string; /* req.header("Bearer"); */

    console.log(token);

    if (!token) return res.status(403).json({ message: "no token provided" });

    const decoded = jwt.verify(
      token,
      config.SECRET_KEY || "secret_key"
    ) as IDecoded;

    req.userData = decoded.id;

    const user = await User.findById(req.userData, { password: 0 });

    if (!user) return res.status(404).json({ message: "no user found" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized", error });
  }
};

export const isAdmin = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req.userData);
  const roles = await Role.find({ _id: { $in: user!.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }

  return res.status(403).json({ message: "you need admin role" });
};

export const isUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req.userData);
  const roles = await Role.find({ _id: { $in: user!.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "user") {
      next();
      return;
    }
  }

  return res.status(403).json({ message: "you need user role" });
};

// ya funciona el rol admin y user para crear y borrar producto, no estoy usando el rol mmoderator
//  video js, 1.57

interface Idecoded {
  _id: string;
  iat: number;
  exp: number;

  authorization: string;
}
