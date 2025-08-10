import bcrypt from 'bcrypt'
import userModel from '../Models/userModel.js'
import validator from 'validator'
import jwt from 'jsonwebtoken'
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
export const loginUser = async (req,res)=>{
    const {email,password} = req.body
    if(!email||!password){
        return res.json({success:false,message:'Please provide full details'})
    }
    try {
        const exists =  await userModel.findOne({email})
        if(!exists){
            return res.json({success:false,message:'Email not found'})
        }
        const isMatches=await bcrypt.compare(password,exists.password)
        if(!isMatches){
            return res.json({success:false,message:'Please enter correct password'})
        }
        const token = createToken(exists._id)
        return res.json({success:true,token})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}
export const registerUser = async (req,res)=>{
    const {name,email,password}= req.body
    if(!email||!password||!name){
        return res.json({success:false,message:'Please provide full details'})
    }
    try {
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message:'Email already exists'})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:'Please enter a valid email'})
        }
        if(password.length<8){
            return res.json({success:false,message:'Please enater a strong password'})
        }
        const hashedPass = await bcrypt.hash(password,10)
        const user = new userModel({name,email,password:hashedPass})
        await user.save()
        const token = createToken(user._id)
        return res.json({success:true,token})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "Enter the required details" });
    }
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET);
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
