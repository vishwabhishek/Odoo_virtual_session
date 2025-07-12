import express from "express";

import "dotenv/config";
import connectDB from "./db/userdb.js";
import userRouter from "./routes/user.routes.js";
const app = express();
app.use(express.json());

app.use("/api/user", userRouter);

app.listen(process.env.PORT || 3000, ()=>{
    console.log("server is running ")
    connectDB();
})