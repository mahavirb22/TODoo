import express from "express"
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodos,
} from "../controllers/todo.controller.js"

const router = express.Router()

// Get all todos
router.get("/", getTodos)

// Add new todo
router.post("/", addTodo)

// ⚠️ IMPORTANT: DELETE ALL MUST COME FIRST
router.delete("/all", deleteAllTodos)

// Update todo
router.put("/:id", updateTodo)

// Delete single todo
router.delete("/:id", deleteTodo)

export default router
