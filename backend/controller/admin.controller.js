import Admin from "../Schemas/admin.schema.js";
import jwt from "jsonwebtoken";

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