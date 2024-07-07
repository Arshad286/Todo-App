import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Connect from "./config/connect-db.js";

dotenv.config();

// Connect to the database
Connect();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());



app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({ data: "hello" });
});


app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});