import {User,Skill, CollabRequest  } from "../Schemas/user.schema.js";
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
        if (existingUser.banned) {
            return res.status(403).json({ message: "Account is banned" });
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

export const addSkill = async (req,res)=>{
    try {
        const skills = req.body;
        if (!Array.isArray(skills) || skills.length === 0) {
            return res.status(400).json({ message: 'Skills must be a non-empty array' });
        }

        for (const skill of skills) {
            if (!skill.name || typeof skill.name !== 'string') {
                return res.status(400).json({ message: 'Each skill must have a valid name' });
            }
        }
        const userId = await User.findOne({username: req.username})
        const skillDocs = skills.map(skill => ({
            user: userId,
            name: skill.name,
            description: skill.description || '',
            level: skill.level || 'Beginner'
        }));
        const savedSkills = await Skill.insertMany(skillDocs);
        return res.status(201).json({message:"skill saved successfully"});
    } catch (error) {
        console.log("error in adding the skill")
        return res.status(500).json({message:"error in adding the skill"})

    }
}

export const sendReq = async (req,res)=>{
    try {
        const { receiver, projectName, projectDescription, requiredSkills, message } = req.body;

    if (!receiver || !projectName || !projectDescription || !requiredSkills?.length) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const collab = new CollabRequest({
      sender: new mongoose.Types.ObjectId(req.userId),
      receiver,
      projectName,
      projectDescription,
      requiredSkills,
      message
    });

    await collab.save();
    return res.status(201).json({ message: "Collaboration request sent", collab });
    } catch (error) {
        console.error("Error sending collab request:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const receiveReq = async (req,res)=>{
    try {
    const requests = await CollabRequest.find({ receiver: req.userId })
      .populate("sender", "username email");

    res.json(requests);
  } catch (error) {
    console.error("Error fetching received requests:", error);
    res.status(500).json({ message: "Server error" });
  }

}

