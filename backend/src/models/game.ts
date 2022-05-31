import Word from "./word"

export default class Game {
	private word: string
	private validator: Word
	private guesses: string[]
	private numberOfGuesses: number

	constructor(word: string) {
		this.numberOfGuesses = 5
		this.word = word
		this.validator = new Word(this.word)
		this.guesses = Array()
	}

	public guess(word: string): string {
		if (this.isFinished()) throw new Error("Game alredy finished")

		const result = this.validator.check(word) as string
		this.guesses.push(result)
		return result
	}

	public guessesRemaining(): number {
		return this.numberOfGuesses - this.guesses.length
	}

	public getNumberOfGuesses(): number {
		return this.guesses.length
	}

	public hasWon(): boolean {
		return this.guesses.includes("1".repeat(this.word.length))
	}

	public isFinished(): boolean {
		return this.guessesRemaining() == 0 || this.hasWon()
	}
}
