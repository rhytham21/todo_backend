const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

//add task
router.post("/add", taskController.addTask);

//find all tasks
router.get("/find", taskController.getTasks);

//delete task
router.post("/delete/:id", taskController.deleteTasks);

//update task
router.post("/update", taskController.updateTasks);

module.exports = router;
