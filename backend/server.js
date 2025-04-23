import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import createHttpError from "http-errors";
import DBConnection from "./config/db.js";
import authRoutes from "./routes/auth.js";
import todoRoutes from "./routes/todo.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use('/api/todo', todoRoutes);
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});
const port = process.env.PORT || 5001;

app.listen(port, async () => {
  await DBConnection();
  console.log(`Server is running on port ${port}`);
});
