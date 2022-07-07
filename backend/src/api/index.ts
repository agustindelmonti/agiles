import { Router } from "express"
import lobbyRouter from "./lobby"

const router = Router()

router.use("/lobby", lobbyRouter)

export default router
