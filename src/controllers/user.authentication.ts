import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/bycrypt";
import { token } from "../utils/jwt";
import { upload } from "../utils/cloudinary";
import { sendEMail } from "../utils/nodemailer";
import CustomError from "../middleware/error.handler";


export const register = async (req: Request, res: Response) => {
  //havent passed role why?
  const { first_name, last_name, email, password } = req.body;
  const profile = req.file as Express.Multer.File;

  if (!first_name || !last_name || !email || !profile) {
    return res.status(400).json({ message: "All fields required" });
  }

  const user = new User({ first_name, last_name, email });
  const hashedPass = await hashPassword(password);

  user.password = hashedPass as string;

  if (profile) {
    const { secure_url, public_id } = (await upload(
      profile.path,
      "/profile_images"
    )) as {
      secure_url: string;
      public_id: string;
    };
    user.profile_image = {
      path: secure_url,
      public_id,
    };
  }

  await user.save();
  return res.status(200).json({ message: "Profile Created", data: user });
};

//login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Enter both Email & Password" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("User not found", 400);
    
  }

  const isPassMatch = await comparePassword(password, user.password);
  if (!isPassMatch) {
    return res.status(400).json({ message: "Credentials do not match" });
  }

  const access_token = token({
    _id: user._id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    Role: user.role,
  });

  await sendEMail({
    html: "<h1>Login Successful</h1>",
    subject: "Login to account",
    to: user.email,
  });

  return res
   
      .cookie("access_token", access_token, {
        sameSite: "none",
        httpOnly: true,
        secure: process.env.NODE_ENV === "development" ? false : true,
        maxAge:
          Number(process.env.COOKIE_EXPIRES_IN || "7") * 24 * 60 * 60 * 1000,
      })

    .status(200)
    .json({ message: "Login Successful", token: access_token });
};


//change password
const changePass = async(req:Request, res:Response, next:NextFunction)=>{
  try {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user){
    throw new CustomError("User not found", 400)
    }
    const newPass = await hashPassword(password)
    user.password = newPass as string

    res.status(200).json({message:'Password Updated',status:'success'})
  } catch (error) {
    throw new CustomError("Issue changing Password", 500)
  }

}