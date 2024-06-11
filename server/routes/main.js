const express = require('express');
const router = express.Router();
// const Post = require('../models/Post');

router.get("/", async (req, resp) => {
    const locals = {
        title: "NodeJs Blogs Home",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
    };
    resp.render('index', { locals })
})

router.get("/about", async (req, resp) => {
    const locals = {
        title: "NodeJs Blogs About",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
    };
    resp.render('about', { locals })
})
router.get("/contact", async (req, resp) => {
    const locals = {
        title: "NodeJs Blogs Contact",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
    };
    resp.render('contact', { locals })
})
// router.get('/', async (req, res) => {
//     try {
//         const locals = {
//             title: "NodeJs Blog",
//             description: "Simple Blog created with NodeJs, Express & MongoDb."
//         };

//         const perPage = 10;
//         const page = parseInt(req.query.page) || 1; // Ensure page is a number

//         const [data, count] = await Promise.all([
//             Post.find() // Use .find() for simpler queries
//                 .sort({ createdAt: -1 })
//                 .skip(perPage * (page - 1)) // Fix pagination calculation
//                 .limit(perPage)
//                 .exec(),
//             Post.countDocuments()
//         ]);

//         const hasNextPage = page < Math.ceil(count / perPage);

//         res.render('index', {
//             locals,
//             posts: data, // Rename to 'posts' for clarity
//             currentPage: page, // Rename for consistency
//             nextPage: hasNextPage ? page + 1 : null,
//             currentRoute: '/'
//         });
//     } catch (error) {
//         console.error("Error Message", error); // Use console.error for errors
//         res.status(500).send("Internal Server Error"); // Inform the user of the error
//     }
// });

// // router.get('', async (req, res) => {
// //   const locals = {
// //     title: "NodeJs Blog",
// //     description: "Simple Blog created with NodeJs, Express & MongoDb."
// //   }

// //   try {
// //     const data = await Post.find();
// //     res.render('index', { locals, data });
// //   } catch (error) {
// //     console.log(error);
// //   }

// // });


// /**
//  * GET /
//  * Post :id
// */
// router.get('/post/:id', async (req, res) => {
//     try {
//         let slug = req.params.id;

//         const data = await Post.findById({ _id: slug });

//         const locals = {
//             title: data.title,
//             description: "Simple Blog created with NodeJs, Express & MongoDb.",
//         }

//         res.render('post', {
//             locals,
//             data,
//             currentRoute: `/post/${slug}`
//         });
//     } catch (error) {
//         console.log(error);
//     }

// });


// /**
//  * POST /
//  * Post - searchTerm
// */
// router.post('/search', async (req, res) => {
//     try {
//         const locals = {
//             title: "Seach",
//             description: "Simple Blog created with NodeJs, Express & MongoDb."
//         }

//         let searchTerm = req.body.searchTerm;
//         const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

//         const data = await Post.find({
//             $or: [
//                 { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
//                 { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
//             ]
//         });

//         res.render("search", {
//             data,
//             locals,
//             currentRoute: '/'
//         });

//     } catch (error) {
//         console.log(error);
//     }

// });


// /**
//  * GET /
//  * About
// */
// router.get('/about', (req, res) => {
//     res.render('about', {
//         currentRoute: '/about'
//     });
// });


// // function insertPostData () {
// //   Post.insertMany([
// //     {
// //       title: "Building APIs with Node.js",
// //       body: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js"
// //     },
// //     {
// //       title: "Deployment of Node.js applications",
// //       body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments..."
// //     },
// //     {
// //       title: "Authentication and Authorization in Node.js",
// //       body: "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries."
// //     },
// //     {
// //       title: "Understand how to work with MongoDB and Mongoose",
// //       body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications."
// //     },
// //     {
// //       title: "build real-time, event-driven applications in Node.js",
// //       body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js."
// //     },
// //     {
// //       title: "Discover how to use Express.js",
// //       body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications."
// //     },
// //     {
// //       title: "Asynchronous Programming with Node.js",
// //       body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations."
// //     },
// //     {
// //       title: "Learn the basics of Node.js and its architecture",
// //       body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers."
// //     },
// //     {
// //       title: "NodeJs Limiting Network Traffic",
// //       body: "Learn how to limit netowrk traffic."
// //     },
// //     {
// //       title: "Learn Morgan - HTTP Request logger for NodeJs",
// //       body: "Learn Morgan."
// //     },
// //   ])
// // }

// // insertPostData();


module.exports = router;