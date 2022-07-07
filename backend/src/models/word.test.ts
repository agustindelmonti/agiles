import Word from "./word"

describe("attempt", () => {
	const word = new Word("perro")

	test("null", () => {
		expect(() => word.check(null)).toThrow(
			`Must enter a ${word.getWordLength()} letter word`
		)
	}),
		test("6 letter word", () => {
			expect(() => word.check(null)).toThrow(
				`Must enter a ${word.getWordLength()} letter word`
			)
		}),
		test("4 letter word", () => {
			expect(() => word.check(null)).toThrow(
				`Must enter a ${word.getWordLength()} letter word`
			)
		}),
		test("5 correct letters", () => {
			expect(word.check("perro")).toEqual("11111")
		}),
		test("5 wrong letters", () => {
			expect(word.check("xxxxx")).toEqual("00000")
		}),
		test("1 correct letter in wrong place", () => {
			expect(word.check("xpxxx")).toEqual("0*000")
		}),
		test("2 repeated letters, 1 correct place ", () => {
			expect(word.check("xxrxx")).toEqual("00100")
		}),
		test("2 repeated letters, 1 correct place, 1 wrong place", () => {
			expect(word.check("xxrxr")).toEqual("0010*")
		}),
		test("2 repeated letters, 2 wrong place ", () => {
			expect(word.check("rxxxr")).toEqual("*000*")
		}),
		test("3 repeated letters, 2 correct place, 1 wrong place", () => {
			expect(word.check("xxrrr")).toEqual("00110")
		}),
		test("5 repeated letters, 2 correct place, 3 wrong place", () => {
			expect(word.check("rrrrr")).toEqual("00110")
		})
})
