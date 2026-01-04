import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
import cors from "cors";
import todoRoutes from "./api/todos.js";

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://todo-frontend-git-main-peter2great2s-projects.vercel.app",
      "https://todo-frontend-lkm4hgbwb-peter2great2s-projects.vercel.app",
      "https://todo-frontend-steel-ten.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
