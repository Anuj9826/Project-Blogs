const express = require('express');
const router = express.Router();
const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")
const commonMiddleware = require("../middleware/auth")


//---------------------------------------------------------------//

//...........................Author..............................//

router.post("/authors", authorController.createAuthor)

router.post("/login", authorController.login)

//...........................Blog...............................//

router.post("/blogs",commonMiddleware.tokenChecker, blogController.createBlog)

router.get("/blogs", commonMiddleware.tokenChecker, blogController.getBlogs)

router.put("/blogs/:blogId", commonMiddleware.tokenChecker, blogController.update)

//...........................Delete.............................//

router.delete("/blogs/:blogId", commonMiddleware.tokenChecker, blogController.deleteByBlogId)

router.delete("/blogs", commonMiddleware.tokenChecker, blogController.deleteByQuery)

//............................................................//

module.exports = router;
