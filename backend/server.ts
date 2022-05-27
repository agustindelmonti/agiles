import app from "./src/app"

var PORT = process.env.PORT || 3000
var HOST = process.env.HOST || "0.0.0.0"

app.listen(Number(PORT), HOST)
