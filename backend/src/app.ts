import express from "express"
import api from "./api"
import bodyParser from "body-parser"

const app = express()
app.use(bodyParser.json())

app.use("/", express.static("public"))

app.use("/api", api)

export default app
