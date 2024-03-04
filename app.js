import express from "express"
import __dirname from "./utils.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io"

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))
app.set('views', `${__dirname}/views`)  
app.set('view engine', 'handlebars')
app.engine('handlebars', handlebars.engine())

app.get("/", (req,res)=>{
    const datos = {
        mensaje: "Hola desde el servidor",
        otroDato: "Información adicional"
    }

    res.render("realtimeproducts", datos)
})

app.get("/products", (req, res) => {
    const products = [
        { name: "Producto 1" },
        { name: "Producto 2" },
    ]

    res.json(products);
})

let server = app.listen(port, () => {
    console.log("Servidor funcionando en http://localhost:" + port)
})

const io = new Server (server)  

io.on('connection', socket => {
    console.log("Conectado")

    socket.on("newProduct", productName => {
        io.emit('newProduct', productName)
    })
})