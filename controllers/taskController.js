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

    return res
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
    return res.status(200).json({ success: true, tasks: tasks });
  } catch (error) {
    console.log(error);
    return res.send(500).json({ success: false, message: error });
  }
};

exports.deleteTasks = async (req, res, next) => {
  try {
    const task_id = req?.params?.id;
    const deleted_task = await Task.findOneAndDelete({ _id: task_id });

    if (!deleted_task)
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });

    return res.status(200).json({
      success: true,
      message: "Task Deleted Succesfully.",
      task: deleted_task,
    });
  } catch (error) {}
};

exports.updateTasks = async (req, res, next) => {
  try {
    const task_id = req?.query?.id;
    const task = req?.body?.task;
    // let updatedTask = await Task.findOneAndUpdate(
    //   { _id: task_id },
    //   {
    //     $set: task,
    //   }
    // );

    console.log("Was here");

    let updatedTask = await Task.findOne({ _id: task_id });
    updatedTask.taskName = task?.taskName;
    updatedTask.taskDescription = task?.taskDescription;
    await updatedTask.save();

    console.log("Upadated tasks => ", updatedTask);

    if (!updatedTask)
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });

    return res.status(200).json({
      success: true,
      message: "Task Updated Succesfully.",
      task: updatedTask,
    });
  } catch (error) {}
};
