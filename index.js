import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import express from "express";
import blogRoutes from "./routes/blogRoute.js ";
import cors from "cors";
dotenv.config();
connectDB();

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use("/api/", blogRoutes);

app.listen(port);
