const express = require("express")   //required to use router 
const router = express.Router();
const Post = require("../models/Post")  




router.get("", async (req, resp) => {  //homepage 
    try {

        const locals = {
            title: "NodeJS Blog",
            description: "Blog created with NodeJS, Express and MongoDB"
        }

        let perPage = 10
        let page = req.query.page || 1

        const data = await Post.aggregate([{
            $sort: { createdAt: -1 }
        }]).skip(perPage * page - perPage).limit(perPage).exec()


        const count = await Post.countDocuments({})
        const nextPage = parseInt(page) + 1
        const hasNextPage = nextPage <= Math.ceil(count / perPage)

        resp.render("index", {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            currentRoute: "/"
        });
    } catch (error) {
        console.log(error)
    }
})

router.get("/post/:id", async (req, resp) => {
    try {
        let slug = req.params.id
        const data = await Post.findById({ _id: slug })

        const locals = {
            title: data.title,
            description: "Blog created with NodeJS, Express, and MongoDB"
        }

        resp.render("post", {
            locals,
            data,
            currentRoute: `/post/${slug}`
        })
    } catch (error) {
        console.log(error)
    }
})


router.post("search", async (req, resp) => {
    try {
        const locals = {
            title: "Search", 
            description: "Blog created with NodeJS, Express, and MongoDB"
        }

        let searchTerm = req.body.searchTerm
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "")

        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, "i")}},
                { body: { $regex: new RegExp(searchNoSpecialChar, "i")}}
            ]
        }); 
        resp.render("search", {
            data, 
            locals, 
            currentRoute: "/"
        });
    } catch (error){
        console.log(error)
    }
})

router.get("/about", (req, resp) => {
    resp.render("about", {
        currentRoute: "/about"
    })
})

module.exports = router