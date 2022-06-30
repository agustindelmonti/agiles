import { Router, Response } from "express"
import Lobby from "../models/lobby"
import LobbyConfigModel from "../models/LobbyConfigModel"
import { CustomRequest } from "../utils/CustomRequest"

var lobby: Lobby

const router = Router()

router.get("/:id", (req, res) => {
	if (!lobby || lobby.getId() !== req.params.id) {
		return res.status(404).send({ message: `Lobby does not exist` })
	}
	return res.send(lobby)
})

router.post("/start", (req: CustomRequest<LobbyConfigModel>, res: Response) => {
	var config = req.body
	try {
		lobby = new Lobby(config)
	} catch (e) {
		return res.send(e.message)
	}
	return res.send(lobby)
})

router.patch("/:id", (req: CustomRequest<LobbyConfigModel>, res: Response) => {
	if (!lobby || lobby.getId() !== req.params.id) {
		return res.status(404).send({ message: `Lobby does not exist` })
	}

	var config = req.body
	try {
		lobby.updateConfig(config)
	} catch (e) {
		return res.status(400).send({ message: e.message })
	}
	res.send(lobby)
})

router.post(
	"/:id/game-start",
	(req: CustomRequest<LobbyConfigModel>, res: Response) => {
		if (!lobby || lobby.getId() !== req.params.id) {
			return res.status(404).send({ message: `Lobby does not exist` })
		}

		var config = req.body
		try {
			lobby.updateConfig(config)
			lobby.startGame()
			res.send({ message: `Game started` })
		} catch (e) {
			return res.status(400).send({ message: e.message })
		}
	}
)

router.post("/:id/:guess", (req, res) => {
	if (!lobby || lobby.getId() !== req.params.id) {
		return res.status(404).send({ message: `Lobby does not exist` })
	}

	const game = lobby.getGame()
	if (!game) {
		return res.status(404).send({
			message: `No game ongoing in this lobby`,
			link: `${req.protocol}://${req.get("host")}${req.originalUrl}/${
				req.params.id
			}/game-start`,
		})
	}

	if (game.isFinished())
		return res.send({ message: "game finished", ended: true })

	const result = game.guess(req.params.guess)

	if (!game.isFinished())
		return res.send({
			guess: req.params.guess,
			result,
			ended: false,
			secret: game.getSecretWord(),
		})

	if (game.hasWon())
		return res.send({
			guess: req.params.guess,
			result,
			message: `You have won! The secret word was ${game.getSecretWord()}`,
			ended: true,
			secret: game.getSecretWord(),
			status: "Won",
		})

	return res.send({
		guess: req.params.guess,
		result,
		message: `You have lost! The secret word was ${game.getSecretWord()}`,
		ended: true,
		secret: game.getSecretWord(),
		status: "Lost",
	})
})

export default router
