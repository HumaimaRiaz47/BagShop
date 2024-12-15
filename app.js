const express = require('express');
const app = express();
const path = require('path')
const cookieParser = require('cookie-parser')
const db = require('./config/mongoose-connection')
const usersRouter = require('./routes/usersRouter')
const ownersRouter = require('./routes/ownersRouter')
const productsRouter = require('./routes/productsRouter')

require('dotenv').config() //able to use all env 

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs")
app.use(cookieParser())


// app.get("/", (req,res) => {
//     res.send("hello")
// })

app.use("/users", usersRouter)
app.use("/owners", ownersRouter)
app.use("/products", productsRouter)

app.listen(3000)