import { Schema, model,Document } from "mongoose";
import bcrypt from "bcrypt";
 
export interface IUser extends Document{ 
  userName: string,
  email:string,
  password:string,
  roles:string[],
  _id:string,
  encryptPassword(password:string):Promise<string>,
  comparePasswords(password:string,receivedPassword:string):Promise<boolean>
    
  


}
export const ROLE = ["admin","user","moderator"]
const userSchema = new Schema({
 
    userName: {
      type: String,
      unique: true,
      min:4,
      lowercase:true
    },
    email: {
      type: String,
      unique: true,
      lowercase:true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },

    password: {
      type: String,
      required: true,
    },

    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
  },

  {
    timestamps: true, 
    versionKey: false,
  }
);
export const encryptPassword =  async (password:string):Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return  bcrypt.hash(password, salt);
};

export const comparePasswords = async (password:string,receivedPassword:string):Promise<boolean>=> {
 return await bcrypt.compare(password, receivedPassword)
};

export default model<IUser>("User", userSchema);
