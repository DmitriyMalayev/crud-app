const express = require("express")   //required to use router 
const router = express.Router(); 

router.get("/about", (req, resp) => {
    resp.send("Hello World")
})

module.exports = router