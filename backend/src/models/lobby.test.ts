import Game from "./game"
import Lobby from "./lobby"
import LobbyConfigModel from "./LobbyConfigModel"

describe("config lobby", () => {
	test("username", () => {
		let config: LobbyConfigModel = {
			difficulty: 5,
			language: "es",
			username: "pepe",
		}
		let lobby = new Lobby(config)
		expect(lobby.getUsername()).toEqual("pepe")
	}),
		test("wrong language", () => {
			let config: LobbyConfigModel = {
				difficulty: 5,
				language: "ru",
				username: "pepe",
			}
			expect(() => new Lobby(config)).toThrow("Language not supported")
		}),
		test("wrong difficulty", () => {
			let config: LobbyConfigModel = {
				difficulty: 16,
				language: "es",
				username: "pepe",
			}
			expect(() => new Lobby(config)).toThrow("Difficulty not supported")
		})
})

describe("lobby stats", () => {
	/*
1 - Error no termino la partida todavia
2 - Partida terminada con victoria
3 - Partida terminada con derrota
*/
	let config: LobbyConfigModel = {
		difficulty: 5,
		language: "es",
		username: "pepe",
	}

	test("start new game", () => {
		let lobby = new Lobby(config)
		lobby.startGame()
		expect(lobby.getGame()).toBeInstanceOf(Game)
	}),
		test("game status started", () => {
			let lobby = new Lobby(config)
			lobby.startGame()
			expect(lobby.getGame().isFinished()).toEqual(false)
		}),
		test("game status finished", () => {
			let lobby = new Lobby(config)
			jest.spyOn(lobby, "getRandomWord").mockReturnValue("perro")
			lobby.startGame()
			lobby.getGame().guess("perwo")
			lobby.getGame().guess("perwo")
			lobby.getGame().guess("perwo")
			lobby.getGame().guess("perwo")
			lobby.getGame().guess("perwo")
			expect(lobby.getGame().isFinished()).toEqual(true)
		}),
		test("ongoing game", () => {
			let lobby = new Lobby(config)
			jest.spyOn(lobby, "getRandomWord").mockReturnValue("perro")
			lobby.startGame()
			expect(() => lobby.getGameStats()).toThrow("Game not finished yet")
		}),
		test("victory message", () => {
			let lobby = new Lobby(config)
			jest.spyOn(lobby, "getRandomWord").mockReturnValue("perro")
			lobby.startGame()
			lobby.getGame().guess("perro")
			expect(lobby.getGameStats()).toEqual("pepe-victory-1")
		}),
		test("defeat message", () => {
			let lobby = new Lobby(config)
			jest.spyOn(lobby, "getRandomWord").mockReturnValue("perro")
			lobby.startGame()
			lobby.getGame().guess("perwo")
			lobby.getGame().guess("perwo")
			lobby.getGame().guess("perwo")
			lobby.getGame().guess("perwo")
			lobby.getGame().guess("perwo")
			expect(lobby.getGameStats()).toEqual("pepe-defeat")
		})
})
