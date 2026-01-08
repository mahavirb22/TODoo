import bcrypt from "bcrypt"
import AccessCode from "../models/AccessCode.js"

export const verifyAccessCode = async (req, res) => {
  const { code } = req.body

  const saved = await AccessCode.findOne()
  if (!saved) return res.status(500).json({ message: "Access code not set" })

  const isValid = await bcrypt.compare(code, saved.codeHash)
  if (!isValid)
    return res.status(401).json({ message: "Invalid access code" })

  res.json({ success: true })
}
