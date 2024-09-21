import express from "express";
import cors from "cors";
import "dotenv/config";
import songRouter from "./src/routes/songRoutes.js";
import connectDB from "./src/config/mongodb.js";

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
// middlewares
app.use(express.json());
app.use(cors());

//initializing routes
app.use("/api/song", songRouter);
app.get("/", (req, res) => res.send("API working"));
app.listen(port, () => console.log(`Server started on ${port}`));
