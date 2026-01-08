import { motion } from "framer-motion"

export default function FloatingButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="
        fixed bottom-6 right-6
        flex items-center gap-2
        rounded-full
        bg-gradient-to-r from-indigo-500 to-purple-600
        px-6 py-3
        text-white font-medium
        shadow-xl
        hover:shadow-2xl
        transition
      "
    >
      <span className="text-xl">＋</span>
      Add
    </motion.button>
  )
}
