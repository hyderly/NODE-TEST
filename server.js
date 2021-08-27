import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running ...");
});

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(
    `Server is running on ${process.env.NODE_ENV} enviroment at port ${PORT}`
  )
);
