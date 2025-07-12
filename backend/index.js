import express from "express";

import "dotenv/config";
import connectDB from "./db/userdb.js";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import publicRouter from "./routes/public.js"

const app = express();
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/admin",adminRouter);
app.use("/api", publicRouter)

app.listen(process.env.PORT || 3000, ()=>{
    console.log("server is running ")
    connectDB();
})