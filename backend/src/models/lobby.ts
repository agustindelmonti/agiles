import Game from "./game"

export class Lobby {
	private username: string
	private game: Game
	private dificulty: number

	constructor() {}

	public setUsername(username: string) {
		this.username = username
	}

	public getUsername() {
		return this.username
	}

	public startGame() {
		const randomWord = this.getRandomWord()
		this.dificulty = randomWord.length
		this.game = new Game(randomWord)
	}

	public getGame(): Game {
		return this.game
	}

	public getRandomWord(): string {
		return "perro"
	}

	public getGameStats(): string {
		if (!this.game.isFinished()) throw new Error("Game not finished yet")

		if (!this.game.hasWon()) {
			return `${this.username}-defeat`
		}

		return `${this.username}-victory-${this.game.getNumberOfGuesses()}`
	}
}
