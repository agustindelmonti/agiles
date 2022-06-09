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

var lobby: Lobby

router.post(
	"/lobby/start",
	(req: CustomRequest<LobbyConfigModel>, res: Response) => {
		var config = req.body
		try {
			lobby = new Lobby(config)
		} catch (e) {
			res.send(e.message)
		}
		res.send(lobby)
	}
)

router.post("/lobby/:id/game-start", (req, res) => {
	//find lobby
	if (!lobby) res.send("Lobby does not exist")

	lobby.startGame()
	res.send("game started")
})

router.post("/lobby/:id/:guess", (req, res) => {
	//find lobby
	if (!lobby) res.send("Lobby does not exist")

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
