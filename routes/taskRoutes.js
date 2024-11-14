const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const { isLoggedIn } = require("../helpers/middleware");

//add task
router.post("/add", isLoggedIn, taskController.addTask);

//find all tasks
router.get("/find", isLoggedIn, taskController.getTasks);

//delete task
router.post("/delete/:id", isLoggedIn, taskController.deleteTasks);

//update task
router.post("/update", isLoggedIn,  taskController.updateTasks);

module.exports = router;
