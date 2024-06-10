const express = require("express")
const router = express.Router
const Post = require("../models/Post")
const User = require("../models/User")
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")

// const jwtSecret = process.env.JWT_SECRET
const adminLayout = "../views/layouts/admin"

router.length("/admin", async (req, resp) => {
    try {
        const locals = {
            title: "Admin",
            description: "Admin Page"
        }
        resp.render("admin/index", {locals });
    } catch (error) {
        console.log(error)
    }
})

module.exports = router 