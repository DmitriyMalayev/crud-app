require('dotenv').config()

const express = require("express")
const expressLayout = require("express-ejs-layouts")

const app = express()
const PORT = 5001 || process.env.PORT;
app.use(express.static('public'))


// Templating Engine
app.use(expressLayout)
app.set("layout", "./layouts/main")   //default layout 
app.set("view engine", "ejs")


app.listen(PORT, () => {
    console.log(`App Listening ${PORT}`)
})


// const connectDB = require("./server/config/db.js")

// connectDB()
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json)



app.use("/", require("./server/routes/main"))

