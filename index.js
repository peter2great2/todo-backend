import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
import cors from "cors";
import todoRoutes from "./api/todos.js";

// Middleware
app.use(cors());
app.use(express.json());
app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
