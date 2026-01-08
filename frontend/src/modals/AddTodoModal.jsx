import { motion } from "framer-motion"
import { useState } from "react"

export default function AddTodoModal({ onClose, onAdd }) {
  const [title, setTitle] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    onAdd({
      title,
      status: "Pending",
      createdAt: new Date(),
    })

    onClose()
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="
          w-[90%] max-w-md
          rounded-2xl
          bg-white/95
          shadow-2xl
          px-6 py-6
        "
      >
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            New Todo
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            ✕
          </button>
        </div>

        {/* Input */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What do you need to do?"
          autoFocus
          className="
            w-full
            rounded-lg
            border border-gray-300
            px-4 py-3
            text-gray-900
            outline-none
            transition
            focus:border-indigo-500
            focus:ring-2
            focus:ring-indigo-200
          "
          required
        />

        {/* Action */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="
            mt-5
            w-full
            rounded-lg
            bg-gradient-to-r from-indigo-500 to-purple-600
            py-3
            text-sm
            font-medium
            text-white
            shadow-lg
            hover:shadow-xl
            transition
          "
        >
          Add Task
        </motion.button>
      </motion.form>
    </motion.div>
  )
}
