const express = require("express")   //required to use router 
const router = express.Router();
const Post = require("../models/Post")




router.get("", async (req, resp) => {  //homepage 
    try {

        const locals = {
            title: "NodeJS Blog",
            description: "Blog created with NodeJS, Express and MongoDB"
        }

        let perPage = 10  //display at a time 
        let page = req.query.page || 1   //localhost:5000?page=2   

        // sorting, -1 makes the oldest go to the top
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

//getting a single blog post 
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

router.post("/search", async (req, resp) => {
    try {
        const locals = {
            title: "Search",
            description: "Blog created with NodeJS, Express, and MongoDB"
        }

        let searchTerm = req.body.searchTerm
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "")

        const data = await Post.find({
            // .find Creates a find query: gets a list of documents that match filter.
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
                { body: { $regex: new RegExp(searchNoSpecialChar, "i") } }
            ]
        });
        resp.render("search", {
            data,
            locals,
            currentRoute: "/"
        });
    } catch (error) {
        console.log(error)
    }
})

router.get("/about", (req, resp) => {
    resp.render("about", {
        currentRoute: "/about"
    })
})

module.exports = router