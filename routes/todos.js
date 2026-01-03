import { Router } from "express";
import db from "../db.js";

const router = Router();

// Get all todos
router.get("/all", async (req, res) => {
  try {
    const todos = await db.query("SELECT * FROM todo ORDER BY todo_id ASC");
    if (!todos.rows.length) {
      return res.status(404).json({ message: "Todo list is empty" });
    }
    res.json(todos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error " + err.message);
  }
});

// Add a new todo
router.post("/add", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await db.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error " + err.message);
  }
});

export default router;
