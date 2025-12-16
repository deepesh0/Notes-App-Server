import { User } from "/model/user.model";
import { hashPassword } from "../utils/bycrypt";

export const register = async(req, res) => {
  const { first_name, last_name, email, password } = req.body;
  const profile = req.file;

  if (!first_name || !last_name || !email || password || !profile) {
    return res.status(400).json({ message: "All fields required" });
  }
  const user = new User({ first_name, last_name, email });
  const hashedPass = await hashPassword(password);

  user.password = hashedPass;
  if (file){
    const {path, public_id} = await upload(file?.path,'/profile_image')
    user.profile_image={
      path,
      public_id
    }
  }
  await user.save()
  res.status(200).json({message:"Profile Created",status:success, data:user})
};



//login
export const login = async(req, res) => {
  const {email, password } = req.body;

  if(!email || !password){
    res.status(400).json({message:"Enter both Email & Password"})
  }
  const user = await user.findOne({email})
  if(!user){
    res.status(400).json({message:"credentials do not match"})
  }
  const isPassMatch = await comparePassword(password, hashedPass || '')
  if(!isPassMatch){
    res.status(400).json({message:"credentials do not match"})
  }

}
