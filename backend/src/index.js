import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import {connectDB} from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT||5174;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
     origin: "http://localhost:5173",
     credentials: true,
})
);
   
// Example using Express.js in Node.js
app.use((req, res, next) => {
     res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Replace with your frontend's origin
     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); 
     next();
   });

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () =>{
     console.log("server is running on port PORT:" + PORT);
     connectDB();
});