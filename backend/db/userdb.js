import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.DB_STRING)
        // process.exit(1);
        console.log("connected to the database")
    } catch (error) {
        console.log("error in connecting the db")
        process.exit(1);
    }
}

export default connectDB;