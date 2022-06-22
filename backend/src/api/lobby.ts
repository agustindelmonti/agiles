import { Router, Response } from "express"
import Lobby from "../models/lobby"
import LobbyConfigModel from "../models/LobbyConfigModel"
import { CustomRequest } from "../utils/CustomRequest"

var lobby: Lobby

const router = Router()

router.get("/:id", (req, res) => {
	if (!lobby || lobby.getId() !== req.params.id) res.sendStatus(404)
	res.send(lobby)
})

router.post("/start", (req: CustomRequest<LobbyConfigModel>, res: Response) => {
	var config = req.body
	try {
		lobby = new Lobby(config)
	} catch (e) {
		res.send(e.message)
	}
	res.send(lobby)
})

router.patch("/:id", (req: CustomRequest<LobbyConfigModel>, res: Response) => {
	if (!lobby || lobby.getId() !== req.params.id) res.sendStatus(404)

	var config = req.body
	try {
		lobby.updateConfig(config)
	} catch (e) {
		res.send(e.message)
	}
	res.send(lobby)
})

router.post("/:id/game-start", (req, res) => {
	if (!lobby || lobby.getId() !== req.params.id) res.sendStatus(404)

	lobby.startGame()
	res.send("game started")
})

router.post("/:id/:guess", (req, res) => {
	if (!lobby || lobby.getId() !== req.params.id) res.sendStatus(404)

	const game = lobby.getGame()
	if (!game) res.send("There is not a game started in this lobby")

	if (game.isFinished()) res.send("game finished")

	var result = game.guess(req.params.guess)

	if (!game.isFinished()) res.send({ guess: req.params.guess, result: result })

	if (game.hasWon())
		res.send(`You have won! The secret word was ${game.getSecretWord()}`)

	res.send(`You have lost! The secret word was ${game.getSecretWord()}`)
})

export default router
