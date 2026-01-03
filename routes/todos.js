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
    const { description, completed } = req.body;
    const newTodo = await db.query(
      "INSERT INTO todo (description, completed) VALUES ($1, $2) RETURNING *",
      [description, completed || false]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error " + err.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // check if todo exists
    const todo = await db.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
    if (todo.rows.length === 0) {
      return res.status(404).json({ message: `Todo with id ${id} not found` });
    }
    await db.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json({ message: `Todo with id ${id} deleted successfully` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error " + err.message);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // check if todo exists
    const todo = await db.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
    if (todo.rows.length === 0) {
      return res.status(404).json({ message: `Todo with id ${id} not found` });
    }
    const { description, completed } = req.body;
    const updatedTodo = await db.query(
      "UPDATE todo SET description = $1, completed = $2 WHERE todo_id = $3 RETURNING *",
      [description, completed, id]
    );
    res.json(updatedTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error " + err.message);
  }
});
export default router;
