const express = require("express")
const router = express.Router
const Post = require("../models/Post")
const User = require("../models/User")
const bcrypt = require('bcrypt');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const adminLayout = "../views/layouts/admin"
const jwtSecret = process.env.JWT_SECRET


const authMiddleware = (req, resp, next) => {
    const token = req.cookies.token

    if (!token) {
        return resp.status(401).json({ message: "Unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)
        req.userId = decoded.userId
        next()
    } catch (error) {
        resp.status(401).json({ message: "Unauthorized" })
    }
}

router.get("/admin", async (req, resp) => {
    try {
        const locals = {
            title: "Admin",
            description: "Admin Page"
        }
        resp.render("admin/index", { locals, layout: adminLayout })
    } catch (error) {
        console.log(error)

    }
})

router.post("/admin", async (req, resp) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return resp.status(401).json({ message: "Invalid Credentials" })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return resp.status(401).json({ message: "Invalid credentials" })
        }
        const token = jwt.sign({ userId: user._id }, jwtSecret)
        resp.cookie("token", token, { httpOnly: true })
        resp.redirect("/dashboard");
    } catch (error) {
        console.log(error)
    }
})

router.get("/dashboard", authMiddleware, async (req, res) => {
    try {
        const locals = {
            title: "Dashboard",
            description: "Dashboard page"
        }
        const data = await Post.find()
        res.render("admin/dashboard", {
            locals,
            data,
            layout: adminLayout
        })
    } catch (error) {
        console.log(error)
    }
})

router.get("/add-post", authMiddleware, async (req, res) => {
    try {
        const locals = {
            title: "Add Post",
            description: "What post would you like to add?"
        }
        const data = await Post.find()
        res.render("admin/add-post", {
            locals,
            data,
            layout: adminLayout
        })
    } catch (error) {
        console.log(error)
    }
})


router.post("/add-post", authMiddleware, async (req, res) => {
    try {
        try {
            const newPost = new Post({
                title: req.body.title,
                body: req.body.body
            })

            await Post.create(newPost)
            res.redirect("/dashboard")
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        console.log(error)
    }
})



router.get("/edit-post/:id", authMiddleware, async (req, res) => {
    try {
        const locals = {
            title: "Edit Post",
            description: "Which post would you like to edit?"
        }
        const data = await Post.findOne({ _id: req.params.id })
        res.render("admin/add-post", {
            locals,
            data,
            layout: adminLayout
        })
    } catch (error) {
        console.log(error)
    }
})



router.put("/edit-post/:id", authMiddleware, async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body,
            updatedAt: Date.now
        })
        res.redirect(`/edit-post/${req.params.id}`)
    } catch (error) {
        console.log(error)
    }
})


router.post("/admin", async (req, resp) => {
    try {
        const { username, password } = req.body
        if (req.body.username === "admin" && req.body.password === "password") {
            res.send("You're logged in")
        } else {
            res.send("Wrong username or password")
        }
    } catch (error) {
        console.log(error)
    }
})



router.post("/register", async (req, resp) => {
    try {
        const { username, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)

        try {
            const user = await User.create({ username, password: hashedPassword })
            res.status(201).json({ message: "User Created", user })
        } catch (error) {
            if (error.code === 11000) {
                res.status(409).json({ message: "User already in use" })
            }
            res.status(500).json({ message: "Internal server error" })
        }
    } catch (error) {
        console.log(error)
    }
})


router.delete("/delete-post/:id", authMiddleware, async (req, resp) => {
    try {
        await Post.deleteOne({ _id: req.params.id })
        res.redirect("dashboard")
    } catch (error) {
        console.log(error)
    }
})

router.get("/logout", (req, resp) => {
    res.clearCookie("token")
    res.redirect("/")
})



module.exports = router