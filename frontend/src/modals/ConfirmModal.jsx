import { motion } from "framer-motion"

export default function ConfirmModal({
  title,
  message,
  onConfirm,
  onCancel,
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
        transition={{ duration: 0.2 }}
        className="w-[90%] max-w-sm rounded-2xl bg-white/95 shadow-2xl px-6 py-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-red-600 hover:bg-red-700 transition"
          >
            Remove All
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
