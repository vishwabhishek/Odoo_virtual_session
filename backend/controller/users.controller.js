import User from "../Schemas/user.schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res)=>{
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({message:"Please fill all the fields"})
        }

        const existingUser = await User.findOne({email: email});

        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        return res.status(200).json({message:"User registered successfully"})
    } catch (error) {
        console.log("error in the registeration")
        return res.status(500).json({message:"error in the registeration"})
    }
}

export const loginUser = async (req, res)=>{
    try {
        const {username, password} = req.body;

        if(!username || !password){
            return res.status(400).json({message:"Please fill all the fields"})
        }

        const existingUser = await User.findOne({username: username});
        if(!existingUser){
            return res.status(400).json({message:"User does not exist"})
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const token = jwt.sign({username:username}, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        return res.status(200).json({message:"login successful",token})

    } catch (error) {
        console.log("error in the login")
        return res.status(500).json({message:"error in the login"})
    }
}

