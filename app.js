import express, { urlencoded } from "express"
import __dirname from "./utils.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io"

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(console.log("funcionando en servidor", port))