import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import api from "../services/api"

export default function AccessModal({ onSuccess }) {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const inputRef = useRef(null)

  // 🔑 Auto focus when modal opens
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await api.post("/auth/verify", { code })
      onSuccess()
    } catch (err) {
      setError("Invalid access code")
    } finally {
      setLoading(false)
    }
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
        transition={{ duration: 0.25 }}
        className="w-[90%] max-w-md rounded-2xl bg-white/90 shadow-2xl px-8 py-7"
      >
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Enter Access Code
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Unlock your personal workspace
        </p>

        <input
          ref={inputRef}
          type="password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Access Code"
          className="
            w-full
            rounded-lg
            border border-gray-300
            px-4 py-3
            mb-3
            outline-none
            transition
            focus:border-indigo-500
            focus:ring-2
            focus:ring-indigo-200
          "
          required
        />

        {error && (
          <p className="text-red-500 text-sm mb-3">
            {error}
          </p>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          className="
            w-full
            rounded-lg
            bg-gradient-to-r from-indigo-500 to-purple-600
            py-3
            font-medium
            text-white
            shadow-lg
            hover:shadow-xl
            transition
          "
        >
          {loading ? "Verifying..." : "Unlock"}
        </motion.button>
      </motion.form>
    </motion.div>
  )
}
