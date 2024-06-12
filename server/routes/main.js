const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get("", async (req, resp) => {
    try {
        const locals = {
            title: "NodeJs Blogs Home",
            description: "Simple Blog created with NodeJs, Express & MongoDb."
        };

        let perPage = 10
        let page = req.query.page || 1
        const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])  //oldest at top
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec()

        const count = await Post.countDocuments()
        const nextPage = parseInt(page) + 1
        const hasNextPage = nextPage <= Math.ceil(count / perPage)

        resp.render("index", {
            locals, data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            currentRoute: "/"
        })
    } catch (error) {
        console.log(error)
    }
})


router.get("/about", async (req, resp) => {
    const locals = {
        title: "NodeJs Blogs About",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
    };
    resp.render('about', { locals, currentRoute: "/about" },)
})
router.get("/contact", async (req, resp) => {
    const locals = {
        title: "NodeJs Blogs Contact",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
    };
    resp.render('contact', { locals, currentRoute: "/contact" })
})


router.get('/post/:id', async (req, res) => {
    try {
        let slug = req.params.id;

        const data = await Post.findById({ _id: slug });

        const locals = {
            title: data.title,
            description: "Simple Blog created with NodeJs, Express & MongoDb.",
        }

        res.render('post', {
            locals,
            data,
            currentRoute: `/post/${slug}`
        });
    } catch (error) {
        console.log(error);
    }

});


router.post('/search', async (req, res) => {
    try {
        const locals = {
            title: "Search",
            description: "Simple Blog created with NodeJs, Express & MongoDb."
        }
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
                { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
            ]
        });

        res.render("search", {
            data,
            locals,
            currentRoute: '/'
        });

    } catch (error) {
        console.log(error);
    }

});


module.exports = router;