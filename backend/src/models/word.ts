/**
 * Word attempt class
 * Encapsulates the validations against true solution word against a guess word
 */
export default class Word {
	private word: string
	private solution: string[]

	constructor(word: string) {
		this.word = word
		this.solution = this.word.split("")
	}

	public getWordLength = (): number => this.word.length

	/**
	 * Given a guess word, it returns the validation mask string against the true solution word
	 * @param guess guess word
	 * @returns validation mask against the true solution
	 */
	public check(guess: String): String {
		if (!guess || guess.length !== this.word.length) {
			throw new TypeError(`Must enter a ${this.word.length} letter word`)
		}

		const splitGuess = guess.split("")
		const statuses = this.solution.map((_) => "0")

		// check correct letters
		splitGuess.forEach((letter, i) => {
			if (letter === this.solution[i]) {
				statuses[i] = "1"
				return
			}
		})

		// check misplaced letters
		splitGuess.forEach((letter, i) => {
			if (statuses[i] === "1") return

			const indexOfPresentChar = this.solution.findIndex(
				(x, index) => x === letter && statuses[index] !== "1"
			)

			if (indexOfPresentChar > -1) {
				statuses[i] = "*"
			}
		})

		return statuses.join("")
	}
}
