require("dotenv").config()

const express = require("express") 
const expressLayout = require("express-ejs-layouts")
const connectDB = require("./server/config/db.js")

const app = express()
const PORT = 5001 || process.env.PORT; 

connectDB()
app.use(express.urlencoded({extended: true}))
app.use(express.json)
app.use(express.static('public')) 


// Templating Engine
app.use(expressLayout)
app.set("layout", "./layouts/main")
app.set("view engine", "ejs")

app.use("/", require("./server/routes/main.js"))

app.listen(PORT, ()=> {
    console.log(`App Listening ${PORT}`)
})