import Game from "./game"

export class Lobby {
	private username: string
	private game: Game

	constructor() {}

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
		return "perros"
	}
}
