import app from "./src/app"

var PORT = process.env.PORT || 8080
var HOST = process.env.HOST || "0.0.0.0"


app.listen(Number(PORT), HOST)
