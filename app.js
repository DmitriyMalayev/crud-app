require('dotenv').config(); // Load environment variables from .env file

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const cookieParser = require("cookie-parser")
const session = require('express-session');

const MongoStore = require("connect-mongo")


const app = express();
const PORT = process.env.PORT || 5001; // Use environment variable, then fallback

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
})
)

app.use(express.static('public')); // Serve static files (CSS, images, etc.)

// Templating Engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Database Connection
const connectDB = require("./server/config/db.js");
connectDB();

// Routes
app.use("/", require("./server/routes/main"));
app.use("/", require("./server/routes/admin"));


// Error Handling Middleware (Place this after routes)
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging
    res.status(500).send('Something went wrong!'); // Generic error response
});

// Start Server
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});