import Game from "./game"

describe("game", () => {
	test("start new", () => {
		const game = new Game("perro")
		expect(game.isFinished()).toEqual(false)
		expect(game.hasWon()).toEqual(false)
	}),
		test("first try victory", () => {
			const game = new Game("perro")
			const guessed = game.guess("perro")
			expect(guessed).toEqual("11111")
			expect(game.isFinished()).toEqual(true)
			expect(game.hasWon()).toEqual(true)
		}),
		test("last try victory", () => {
			const game = new Game("perro")
			game.guess("perno")
			game.guess("termo")
			game.guess("tendo")
			game.guess("juego")
			game.guess("perro")
			expect(game.isFinished()).toEqual(true)
			expect(game.hasWon()).toEqual(true)
		}),
		test("losing game", () => {
			const game = new Game("perro")
			game.guess("perno")
			game.guess("termo")
			game.guess("tendo")
			game.guess("juego")
			game.guess("gatos")
			expect(game.isFinished()).toEqual(true)
			expect(game.hasWon()).toEqual(false)
		}),
		test("cannot keep playing finished game", () => {
			const game = new Game("perro")
			game.guess("perro")
			expect(game.isFinished()).toEqual(true)
			expect(game.hasWon()).toEqual(true)
			expect(() => game.guess("perro")).toThrow("Game alredy finished")
		})
})
