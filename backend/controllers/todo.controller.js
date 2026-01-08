import Todo from "../models/Todo.js"

/**
 * GET all todos
 */
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 })
    res.json(todos)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos" })
  }
}

/**
 * ADD new todo
 */
export const addTodo = async (req, res) => {
  try {
    const { title, status } = req.body

    if (!title) {
      return res.status(400).json({ message: "Title is required" })
    }

    const todo = await Todo.create({
      title,
      status: status || "Pending",
    })

    res.status(201).json(todo)
  } catch (error) {
    res.status(500).json({ message: "Failed to create todo" })
  }
}

/**
 * UPDATE todo (title / status)
 */
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params
    const { title, status } = req.body

    const todo = await Todo.findById(id)

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" })
    }

    if (title !== undefined) todo.title = title
    if (status !== undefined) todo.status = status

    const updatedTodo = await todo.save()
    res.json(updatedTodo)
  } catch (error) {
    res.status(500).json({ message: "Failed to update todo" })
  }
}

/**
 * DELETE single todo
 */
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params

    const todo = await Todo.findById(id)
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" })
    }

    await todo.deleteOne()
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ message: "Failed to delete todo" })
  }
}

/**
 * DELETE all todos
 */
export const deleteAllTodos = async (req, res) => {
  try {
    await Todo.deleteMany()
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ message: "Failed to delete all todos" })
  }
}
