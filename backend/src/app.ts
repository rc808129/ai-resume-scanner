import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import resumeRoutes from "./routes/resume.routes"


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors())
const PORT = process.env.PORT || 5000;



app.get("/", (req, res) => {
  res.send("Backend Running");
});
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

connectDB();


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});







