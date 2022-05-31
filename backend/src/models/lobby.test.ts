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
		})
})
