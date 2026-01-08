import { motion } from "framer-motion"

export default function ProgressBar({ todos }) {
  const total = todos.length
  const completed = todos.filter(
    (t) => t.status === "Completed"
  ).length

  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-700">
          Progress
        </p>
        <p className="text-sm text-gray-500">
          {completed} / {total} completed
        </p>
      </div>

      <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4 }}
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
        />
      </div>
    </div>
  )
}
