import User, {
  IUser,
  encryptPassword,
  comparePasswords
 
} from "../models/users/user";
import Role from '../models/roles/role'
import config from "../config";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const signUp = async (req: Request, res: Response) => {
  const { userName, email, password, roles } = req.body;

  const hash = await encryptPassword(password);

  const newUser:IUser = new User({
    userName,
    email,
    password: hash,
    roles,
  });

  if(roles) {
  const foundRoles = await Role.find({name:{$in: roles}})
  newUser.roles = foundRoles.map((role: { _id: string; }) => role._id)

  }else {
    const role:IUser = await Role.findOne({name:'user'}) // si no asigno un rol, automaticamente se asigna "user"
    newUser.roles = [role._id]
  }

  const savedUser = await newUser.save();

  const token:string = jwt.sign({ id: savedUser._id }, config.SECRET_KEY, {
    expiresIn: 86400, // 24 hours
  });
  res.json({ token, savedUser });
};


export const signIn = async (req: Request, res: Response) => {

  
  const {email,password} = req.body

  const userFound = await User.findOne({email}).populate("roles");
  

  if(!userFound) return res.status(400).json({message: "user not found"})

 
  
  const matchPassword = await comparePasswords(password, userFound!.password)
  
  if(!matchPassword)  return res.status(400).json({token: "null", message:"invalid Password"})
  


  
  const token = jwt.sign({ id: userFound._id }, config.SECRET_KEY, {
    expiresIn: 86400, // 24 hours
  });
  res.json({ token, userFound});
};

