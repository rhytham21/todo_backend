const Task = require("../model/taskSchema");

// {
//     body:{
//         taskName:"",

//     }
// }

exports.addTask = async (req, res, next) => {
  try {
    console.log("Request Body => ", req?.body);

    const taskName = req?.body?.task?.taskName;
    if (!taskName || !taskName.length) {
      return res.status(400).json({ message: "Task Name is required" });
    }
    const taskDescription = req?.body?.task?.taskDescription;

    const created_task = new Task({
      taskName: taskName,
      taskDescription: taskDescription,
    });

    await created_task.save();

    res
      .status(201)
      .json({ message: "Task added successfully", task: created_task });
  } catch (error) {
    console.log(error);
    res.send(500).json({ success: false, message: error });
  }
};

//get a list of all tasks
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ success: true, tasks: tasks });
  } catch (error) {
    console.log(error);
    res.send(500).json({ success: false, message: error });
  }
};

exports.deleteTasks = async (req, res, next) => {
  try {
  } catch (error) {}
};

exports.updateTasks = async (req, res, next) => {
  try {
    const updatedTask = Task.findById(taskName, updateData, {});
  } catch (error) {}
};
