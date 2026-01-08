import mongoose from "mongoose"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import AccessCode from "./models/AccessCode.js"

dotenv.config()

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB connected")

    const hash = await bcrypt.hash("2006", 10)

    await AccessCode.deleteMany() // optional: clear old codes
    await AccessCode.create({ codeHash: hash })

    console.log("Access code saved successfully")
    process.exit(0)
  } catch (err) {
    console.error("Error:", err)
    process.exit(1)
  }
}

run()
