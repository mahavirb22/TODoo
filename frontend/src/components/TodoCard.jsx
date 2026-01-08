import { motion } from "framer-motion"
import { Pencil } from "lucide-react"

export default function TodoCard({ todo, onToggleComplete, onEdit }) {
  const isCompleted = todo.status === "Completed"

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={`
        group
        relative
        flex items-start gap-3
        rounded-lg
        bg-white
        px-4 py-3
        shadow-sm
        hover:shadow-md
        transition
        ${isCompleted ? "opacity-70" : ""}
      `}
    >
      {/* Complete Circle */}
      <button
        onClick={() => onToggleComplete(todo)}
        className={`
          mt-1
          flex h-5 w-5 items-center justify-center
          rounded-full
          border-2
          transition
          ${
            isCompleted
              ? "border-indigo-500 bg-indigo-500"
              : "border-gray-300 hover:border-indigo-400"
          }
        `}
      >
        {isCompleted && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-xs text-white"
          >
            ✓
          </motion.span>
        )}
      </button>

      {/* Todo Text */}
      <p
        className={`
          flex-1
          text-sm
          text-gray-900
          leading-snug
          transition
          ${
            isCompleted
              ? "line-through text-gray-400"
              : "group-hover:text-gray-800"
          }
        `}
      >
        {todo.title}
      </p>

      {/* Edit Icon */}
      <button
        onClick={() => onEdit(todo)}
        className="
          absolute
          bottom-2 right-2
          rounded
          p-1
          text-gray-400
          opacity-0
          transition
          hover:text-indigo-500
          group-hover:opacity-100
        "
        title="Edit todo"
      >
        <Pencil size={14} />
      </button>
    </motion.div>
  )
}
