import { motion } from "framer-motion"

export default function PendingTodosModal({
  pendingTodos,
  onCancel,
  onStartNew,
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="w-[90%] max-w-md rounded-2xl bg-white shadow-2xl px-6 py-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Still pending tasks
        </h2>

        <p className="text-sm text-gray-600 mb-4">
          You’ve been working for a while. These tasks are still pending:
        </p>

        {/* Pending list */}
        <div className="max-h-48 overflow-y-auto mb-6 space-y-2">
          {pendingTodos.map((todo) => (
            <div
              key={todo._id}
              className="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-800"
            >
              {todo.title}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition"
          >
            Cancel
          </button>

          <button
            onClick={onStartNew}
            className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
          >
            Start New
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
