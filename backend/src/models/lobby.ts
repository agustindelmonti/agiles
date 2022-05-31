import Game from "./game"

export default class Lobby {
	private username: string
	private game: Game
	private dificulty: number
	private language: string

	constructor() {
		this.dificulty = 5
		this.language = "es"
	}

	public setUsername(username: string) {
		this.username = username
	}

	public getUsername() {
		return this.username
	}

	public startGame() {
		const randomWord = this.getRandomWord()
		this.game = new Game(randomWord)
	}

	public getGame(): Game {
		return this.game
	}

	public getRandomWord(): string {
		const file = require(`../const/${this.language}/wordlist.json`)
		const wordlist = file[this.dificulty]
		return wordlist[Math.floor(Math.random() * wordlist.length)]
	}

	public getGameStats(): string {
		if (!this.game.isFinished()) throw new Error("Game not finished yet")

		if (!this.game.hasWon()) {
			return `${this.username}-defeat`
		}

		return `${this.username}-victory-${this.game.getNumberOfGuesses()}`
	}
}
