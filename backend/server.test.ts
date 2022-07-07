import request from "supertest"
import app from "./src/app"

describe("Index ok", () => {
	test("responds to /", async () => {
		const res = await request(app).get("/")
		expect(res.header["content-type"]).toBe("text/html; charset=UTF-8")
		expect(res.statusCode).toBe(200)
	})
})
