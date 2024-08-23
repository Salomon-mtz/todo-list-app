const express = require("express");
const authMiddleware = require("../middleware/authMiddleware"); // Import the authentication middleware
const Task = require("../models/Task"); // Import the Task model
const router = express.Router(); // Create an instance of the Express router

// Route to create a new task
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, subtasks, comments } = req.body; // Extract data from the request body
  try {
    // Create a new task with the provided data, linked to the authenticated user
    const task = new Task({
      user: req.user.id, // Link the task to the user's ID
      title,
      description,
      subtasks,
      comments,
    });
    await task.save(); // Save the task to the database
    res.json(task); // Return the saved task as a JSON response
  } catch (err) {
    res.status(500).send("Server error"); // Handle any server errors
  }
});

// Route to get all tasks for the authenticated user
router.get("/", authMiddleware, async (req, res) => {
  try {
    // Find all tasks associated with the authenticated user's ID
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks); // Return the tasks as a JSON response
  } catch (err) {
    res.status(500).send("Server error"); // Handle any server errors
  }
});

// Route to update an existing task
router.put("/:id", authMiddleware, async (req, res) => {
  const { title, status, subtasks } = req.body; // Extract data from the request body
  try {
    let task = await Task.findById(req.params.id); // Find the task by ID
    if (!task) return res.status(404).json({ msg: "Task not found" }); // Handle task not found

    // Check if the task belongs to the authenticated user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Update the task's title if provided
    if (title) {
      task.title = title;
    }

    // Update the task's subtasks if provided
    if (subtasks) {
      task.subtasks = subtasks;

      // Check if all subtasks are completed
      const allSubtasksCompleted = task.subtasks.every(
        (subtask) => subtask.status === "completed"
      );
      if (!allSubtasksCompleted) {
        task.status = "pending"; // Set task status to pending if not all subtasks are completed
      } else {
        task.status = status || task.status; // Update task status if provided
      }
    } else {
      // If no subtasks provided, update the task's status if provided
      if (status) {
        task.status = status;
      }
    }

    await task.save(); // Save the updated task to the database
    res.json(task); // Return the updated task as a JSON response
  } catch (err) {
    res.status(500).send("Server error"); // Handle any server errors
  }
});

// Route to add a comment to an existing task
router.put("/:id/comments", authMiddleware, async (req, res) => {
  const { text } = req.body; // Extract the comment text from the request body
  try {
    let task = await Task.findById(req.params.id); // Find the task by ID
    if (!task) return res.status(404).json({ msg: "Task not found" }); // Handle task not found

    // Check if the task belongs to the authenticated user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const comment = { text }; // Create a new comment object
    task.comments.push(comment); // Add the comment to the task's comments array

    await task.save(); // Save the updated task to the database
    res.json(task); // Return the updated task as a JSON response
  } catch (err) {
    res.status(500).send("Server error"); // Handle any server errors
  }
});

// Route to edit an existing comment on a task
router.put("/:taskId/comments/:commentId", authMiddleware, async (req, res) => {
  const { text } = req.body; // Extract the new comment text from the request body
  try {
    let task = await Task.findById(req.params.taskId); // Find the task by ID
    if (!task) return res.status(404).json({ msg: "Task not found" }); // Handle task not found

    // Check if the task belongs to the authenticated user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const comment = task.comments.id(req.params.commentId); // Find the comment by ID within the task
    if (!comment) return res.status(404).json({ msg: "Comment not found" }); // Handle comment not found

    comment.text = text; // Update the comment text

    await task.save(); // Save the updated task to the database
    res.json(task); // Return the updated task as a JSON response
  } catch (err) {
    console.error("Error editing comment:", err); // Log any errors
    res.status(500).send("Server error"); // Handle any server errors
  }
});

// Route to delete a comment on a task
router.delete(
  "/:taskId/comments/:commentId",
  authMiddleware,
  async (req, res) => {
    try {
      let task = await Task.findById(req.params.taskId); // Find the task by ID
      if (!task) return res.status(404).json({ msg: "Task not found" }); // Handle task not found

      // Check if the task belongs to the authenticated user
      if (task.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Not authorized" });
      }

      const comment = task.comments.id(req.params.commentId); // Find the comment by ID within the task
      if (!comment) return res.status(404).json({ msg: "Comment not found" }); // Handle comment not found

      comment.remove(); // Remove the comment from the task's comments array

      await task.save(); // Save the updated task to the database
      res.json(task); // Return the updated task as a JSON response
    } catch (err) {
      res.status(500).send("Server error"); // Handle any server errors
    }
  }
);

// Route to delete an existing task
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id); // Find the task by ID
    if (!task) return res.status(404).json({ msg: "Task not found" }); // Handle task not found

    // Check if the task belongs to the authenticated user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Task.findByIdAndRemove(req.params.id); // Remove the task from the database
    res.json({ msg: "Task removed" }); // Return a confirmation message
  } catch (err) {
    res.status(500).send("Server error"); // Handle any server errors
  }
});

module.exports = router; // Export the router to be used in the main application file
