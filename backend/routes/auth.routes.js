import express from "express"
import { verifyAccessCode } from "../controllers/auth.controller.js"

const router = express.Router()

router.post("/verify", verifyAccessCode)

export default router
