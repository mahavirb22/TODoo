import { useEffect, useRef, useState } from "react"
import api from "../services/api"
import AddTodoModal from "../modals/AddTodoModal"
import EditTodoModal from "../modals/EditTodoModal"
import ConfirmModal from "../modals/ConfirmModal"
import PendingTodosModal from "../modals/PendingTodosModal"
import TodoCard from "../components/TodoCard"
import FloatingButton from "../components/FloatingButton"
import ProgressBar from "../components/ProgressBar"
import Confetti from "react-confetti"

const FOCUS_TIME = 35 * 60 * 1000 // 35 minutes
const FOCUS_KEY = "focusStartTime"

export default function Dashboard({ locked }) {
  const [todos, setTodos] = useState([])
  const [openAdd, setOpenAdd] = useState(false)
  const [editingTodo, setEditingTodo] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showPendingModal, setShowPendingModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)

  const focusTimerRef = useRef(null)

  /* ---------- SORT ---------- */
  const sortTodos = (list) =>
    [...list].sort((a, b) =>
      a.status === b.status ? 0 : a.status === "Completed" ? -1 : 1
    )

  /* ---------- FETCH TODOS ---------- */
  useEffect(() => {
    if (!locked) fetchTodos()
  }, [locked])

  const fetchTodos = async () => {
    const res = await api.get("/todos")
    setTodos(sortTodos(res.data))
    setLoading(false)
  }

  /* ---------- CONFETTI ---------- */
  useEffect(() => {
    if (todos.length === 0) {
      setShowConfetti(false)
      return
    }

    const completed = todos.filter(t => t.status === "Completed").length
    if (completed === todos.length) {
      setShowConfetti(true)
      const t = setTimeout(() => setShowConfetti(false), 4000)
      return () => clearTimeout(t)
    }
  }, [todos])

  /* ---------- FOCUS TIMER CORE ---------- */

  const startFocusTimer = () => {
    clearTimeout(focusTimerRef.current)

    const startTime = Date.now()
    localStorage.setItem(FOCUS_KEY, startTime)

    focusTimerRef.current = setTimeout(() => {
      const pending = todos.filter(t => t.status !== "Completed")
      if (pending.length > 0) {
        setShowPendingModal(true)
      }
    }, FOCUS_TIME)
  }

  /* ---------- RESUME TIMER ON REFRESH ---------- */
  useEffect(() => {
    if (todos.length === 0) return

    const storedStart = localStorage.getItem(FOCUS_KEY)
    if (!storedStart) {
      startFocusTimer()
      return
    }

    const elapsed = Date.now() - Number(storedStart)
    const remaining = FOCUS_TIME - elapsed

    clearTimeout(focusTimerRef.current)

    if (remaining <= 0) {
      const pending = todos.filter(t => t.status !== "Completed")
      if (pending.length > 0) {
        setShowPendingModal(true)
      }
    } else {
      focusTimerRef.current = setTimeout(() => {
        const pending = todos.filter(t => t.status !== "Completed")
        if (pending.length > 0) {
          setShowPendingModal(true)
        }
      }, remaining)
    }

    return () => clearTimeout(focusTimerRef.current)
  }, [todos])

  /* ---------- CRUD ---------- */

  const addTodo = async (todo) => {
    const res = await api.post("/todos", todo)
    setTodos(prev => sortTodos([res.data, ...prev]))
  }

  const toggleComplete = async (todo) => {
    const status = todo.status === "Completed" ? "Pending" : "Completed"
    const res = await api.put(`/todos/${todo._id}`, { status })
    setTodos(prev =>
      sortTodos(prev.map(t => (t._id === todo._id ? res.data : t)))
    )
  }

  const saveEditedTodo = async (updated) => {
    const res = await api.put(`/todos/${updated._id}`, {
      title: updated.title,
      status: updated.status,
    })
    setTodos(prev =>
      sortTodos(prev.map(t => (t._id === updated._id ? res.data : t)))
    )
  }

  const removeAllTodos = async () => {
    await api.delete("/todos/all")
    setTodos([])
    setShowConfirm(false)
    setShowPendingModal(false)
    localStorage.removeItem(FOCUS_KEY)
    clearTimeout(focusTimerRef.current)
  }

  /* ---------- PENDING MODAL ACTIONS ---------- */

  const handleCancelPending = () => {
    setShowPendingModal(false)
    startFocusTimer()
  }

  const handleStartNew = async () => {
    await removeAllTodos()
  }

  /* ---------- RENDER ---------- */

  if (loading && !locked) {
    return <p className="text-center mt-20 text-gray-500">Loading...</p>
  }

  const pendingTodos = todos.filter(t => t.status !== "Completed")

  return (
    <div className={`min-h-screen ${locked ? "blur-md pointer-events-none" : ""}`}>
      {showConfetti && <Confetti recycle={false} numberOfPieces={350} />}

      <div className="max-w-5xl mx-auto px-6 py-10">
        <header className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-900">MY Todos</h1>
          {todos.length > 0 && (
            <button
              onClick={() => setShowConfirm(true)}
              className="text-sm font-medium text-red-600 hover:underline"
            >
              Remove All
            </button>
          )}
        </header>

        {todos.length > 0 && <ProgressBar todos={todos} />}

        {todos.length === 0 ? (
          <EmptyState onAdd={() => setOpenAdd(true)} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {todos.map(todo => (
              <TodoCard
                key={todo._id}
                todo={todo}
                onToggleComplete={toggleComplete}
                onEdit={setEditingTodo}
              />
            ))}
          </div>
        )}
      </div>

      {!locked && <FloatingButton onClick={() => setOpenAdd(true)} />}

      {openAdd && (
        <AddTodoModal onClose={() => setOpenAdd(false)} onAdd={addTodo} />
      )}

      {editingTodo && (
        <EditTodoModal
          todo={editingTodo}
          onClose={() => setEditingTodo(null)}
          onSave={saveEditedTodo}
        />
      )}

      {showConfirm && (
        <ConfirmModal
          title="Remove all todos?"
          message="This will permanently delete all tasks."
          onConfirm={removeAllTodos}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {showPendingModal && (
        <PendingTodosModal
          pendingTodos={pendingTodos}
          onCancel={handleCancelPending}
          onStartNew={handleStartNew}
        />
      )}
    </div>
  )
}

/* ---------- EMPTY STATE ---------- */

function EmptyState({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-2xl shadow">
        ✓
      </div>

      <h2 className="text-xl font-medium text-gray-900">No tasks yet</h2>

      <button
        onClick={onAdd}
        className="mt-6 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-white font-medium shadow-lg hover:shadow-xl transition"
      >
        Add your first task
      </button>
    </div>
  )
}
