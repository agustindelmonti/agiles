import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import api from "./api"

const app = express()

const allowedOrigins = [
	"http://localhost:3000",
	"https://wordle-dev-client.herokuapp.com/",
	"https://wordle-prod-client.herokuapp.com/",
]

const options: cors.CorsOptions = {
	origin: allowedOrigins,
}
app.use(cors(options))
app.use(bodyParser.json())

app.use("/", express.static("public"))

app.use("/api", api)

export default app
