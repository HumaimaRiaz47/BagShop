const express = require('express');
const app = express();
const path = require('path')
const cookieParser = require('cookie-parser')
const db = require('./config/mongoose-connection')
const usersRouter = require('./routes/usersRouter')
const ownersRouter = require('./routes/ownersRouter')
const productsRouter = require('./routes/productsRouter')
const expressSession = require('express-session')
const flash = require('connect-flash')

require('dotenv').config() //able to use all env 

//const db = require('./config/mongoose-connection.js')

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs")
app.use(cookieParser())
// Set up session management with express-session middleware
app.use(
    expressSession({
        // Prevents saving the session to the store if it hasn't been modified
        resave: false,
        // Ensures that uninitialized sessions are not saved to the store
        saveUninitialized: false,
        // Secret key used to sign the session ID cookie for security
        secret: process.env.EXPRESS_SESSION_SECRET // Make sure this is set in the environment variables
    })
);

// Enable flash messages middleware
// Flash messages are used to store and temporarily display messages (e.g., success or error messages)
// These messages are stored in the session and automatically removed after being accessed once
app.use(flash());




// app.get("/", (req,res) => {
//     res.send("hello")
// })

app.use("/users", usersRouter)
app.use("/owners", ownersRouter)
app.use("/products", productsRouter)

app.listen(3000)