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

app.get("/products", (req, res) => {
  // Aquí se debe obtener la lista de productos desde la base de datos
  const products = [
    { id: 1, name: "Producto 1" },
    { id: 2, name: "Producto 2" },
    { id: 3, name: "Producto 3" },
  ];

  // Se envía la lista de productos como respuesta
  res.json(products);
});
let server = app.listen(port, () => {
    console.log("Servidor funcionando en http://localhost:" + port)
})

const io = new Server (server)  

io.on('connection', socket => {
    console.log("Conectado");
    
    socket.on("message", data => {
        io.emit('log', data);
    })
})