import {Admin, Announcement} from "../Schemas/admin.schema.js";
import jwt from "jsonwebtoken";
import {User} from "../Schemas/user.schema.js";

export const adminLogin = async (req, res) =>{
    try {
        const {adminname, password} = req.body;
        if(!adminname || !password){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        const existingAdmin = await Admin.findOne({adminname: adminname});
        if(!existingAdmin){
            return res.status(400).json({message:"Admin does not exist"});
        }
        const isPasswordValid = existingAdmin.password === password;
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token = jwt.sign({adminname: adminname}, process.env.JWT_SECRET_FORADMIN, {
            expiresIn: "1h"
        });

        return res.status(200).json({message:"Admin login successful", token});
    } catch (error) {
        console.log("error in the admin login");
        return res.status(500).json({message:"error in the admin login"});
    }
}

export const banUser = async (req,res)=>{
    try {
        const { banned } = req.body; 

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { banned },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.json({ message: banned ? 'User banned' : 'User unbanned', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Server error' });
    }
}

export const accounce= async (req,res)=>{
    try {
        const { title, message, type } = req.body;

    if (!title || !message) {
      return res.status(400).json({ message: 'Title and message are required' });
    }

    const announcement = new Announcement({
      title,
      message,
      type
    });

    await announcement.save();
    return res.status(201).json({ message: 'Announcement sent', announcement });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}