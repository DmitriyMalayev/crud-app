const express = require("express")   //required to use router 
const router = express.Router(); 

router.get("", (req, resp) => {
    const locals = {
        title: "NodeJS Blog",
        description: "Add and Delete Your Posts"
    }
    resp.render("index", {locals})
})

router.get("/about", (req, resp) => {
    resp.render("about")
})


module.exports = router