import { Router, Response } from "express"
import Lobby from "../models/lobby"
import LobbyConfigModel from "../models/LobbyConfigModel"
import { CustomRequest } from "../utils/CustomRequest"
const router = Router()

var cont = 0

router.get("/", (req, res) => {
	cont++
	res.send(`hello wordle ${cont}`)
})

var game

router.post(
	"/lobby/start",
	(req: CustomRequest<LobbyConfigModel>, res: Response) => {
		var config = req.body
		game = new Lobby(config)
		res.send("Hello World")
	}
)

export default router
