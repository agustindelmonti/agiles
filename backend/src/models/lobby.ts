import Game from "./game"
import LobbyConfigModel from "./LobbyConfigModel"

export default class Lobby {
	private config: LobbyConfigModel
	private game: Game

	constructor(config: LobbyConfigModel) {
		this.config = config
	}

	public getUsername() {
		return this.config.username
	}

	public startGame() {
		const randomWord = this.getRandomWord()
		this.game = new Game(randomWord)
	}

	public getGame(): Game {
		return this.game
	}

	public getRandomWord(): string {
		const file = require(`../const/${this.config.language}/wordlist.json`)
		const wordlist = file[this.config.difficulty]
		return wordlist[Math.floor(Math.random() * wordlist.length)]
	}

	public getGameStats(): string {
		if (!this.game.isFinished()) throw new Error("Game not finished yet")

		if (!this.game.hasWon()) {
			return `${this.config.username}-defeat`
		}

		return `${this.config.username}-victory-${this.game.getNumberOfGuesses()}`
	}
}
