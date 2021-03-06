const controllers = require("./controllers.js");
const express = require("express");

const router = express.Router();

router.get("/", controllers.hello);

// write your routes
router.get("/courses", controllers.get_courses);
router.get("/courses/:id", controllers.get_course_by_id);
router.post("/courses", controllers.post_course);
router.put("/courses/:id", controllers.put_course);
router.delete("/courses/:id", controllers.delete_course);

module.exports = router;
