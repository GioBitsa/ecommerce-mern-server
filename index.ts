import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AuthRoutes } from "./routes";
import mongoose from "mongoose";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Recommended for parsing JSON requests

app.use("/api/auth", AuthRoutes);

// Connect to database
mongoose.connect(process.env.CONNECTION_URL ?? "").then(() => {
  console.log("database connected");
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// username: giorgibitsadze01
// password: RSerKR1Mk5mWyNWt

// conntection string: mongodb+srv://giorgibitsadze01:RSerKR1Mk5mWyNWt@server.xleq91f.mongodb.net/?retryWrites=true&w=majority&appName=Server
