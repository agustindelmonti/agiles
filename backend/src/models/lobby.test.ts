import Game from "./game"
import { Lobby } from "./lobby"

describe("config lobby", () => {
	test("username", () => {
		let lobby = new Lobby()
		lobby.setUsername("pepe")
		expect(lobby.getUsername()).toEqual("pepe")
	}),
		test("start new game", () => {
			let lobby = new Lobby()
			lobby.setUsername("pepe")
			lobby.startGame()
			expect(lobby.getGame()).toBeInstanceOf(Game)
		}),
		test("game status started", () => {
			let lobby = new Lobby()
			lobby.setUsername("pepe")
			lobby.startGame()
			expect(lobby.getGame().isFinished()).toEqual(false)
		}),
		test("game status finished", () => {
			let lobby = new Lobby()
			lobby.setUsername("pepe")
			lobby.startGame()
			lobby.getGame().guess("perwo")
			lobby.getGame().guess("perwo")
			lobby.getGame().guess("perwo")
			lobby.getGame().guess("perwo")
			lobby.getGame().guess("perwo")
			expect(lobby.getGame().isFinished()).toEqual(true)
		})
})

describe("lobby stats", () => {
	/*
1 - Error no termino la partida todavia
2 - Partida terminada con victoria
3 - Partida terminada con derrota
*/
	test("ongoing game", () => {
		let lobby = new Lobby()
		lobby.setUsername("pepe")
		lobby.startGame()
		expect(() => lobby.getGameStats()).toThrow("Game not finished yet")
	}),
		test("victory message", () => {
			let lobby = new Lobby()
			lobby.setUsername("pepe")
			lobby.startGame()
			lobby.getGame().guess("perro")
			expect(lobby.getGameStats()).toEqual("pepe-victory-1")
		}),
		test("defeat message", () => {
			let lobby = new Lobby()
			lobby.setUsername("pepe")
			lobby.startGame()
			lobby.getGame().guess("perwo")
			lobby.getGame().guess("perwo")
			lobby.getGame().guess("perwo")
			lobby.getGame().guess("perwo")
			lobby.getGame().guess("perwo")
			expect(lobby.getGameStats()).toEqual("pepe-defeat")
		})
})
