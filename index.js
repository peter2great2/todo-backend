import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
import cors from "cors";
import todoRoutes from "./api/todos.js";

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://todo-frontend-steel-ten.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
