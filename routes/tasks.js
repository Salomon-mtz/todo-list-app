const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Task = require("../models/Task");
const router = express.Router();

// Crear una nueva tarea
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, subtasks, comments } = req.body;
  try {
    const task = new Task({
      user: req.user.id,
      title,
      description,
      subtasks,
      comments,
    });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Obtener todas las tareas
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Actualizar una tarea existente
router.put("/:id", authMiddleware, async (req, res) => {
  const { title, status, subtasks } = req.body;
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Actualizar el título de la tarea si se proporciona
    if (title) {
      task.title = title;
    }

    // Actualizar las subtareas si se proporcionan
    if (subtasks) {
      task.subtasks = subtasks;

      // Verificar si todas las subtareas están completadas
      const allSubtasksCompleted = task.subtasks.every(
        (subtask) => subtask.status === "completed"
      );
      if (!allSubtasksCompleted) {
        task.status = "pending";
      } else {
        task.status = status || task.status;
      }
    } else {
      // Si no se proporcionan subtareas, actualizar el estatus de la tarea principal
      if (status) {
        task.status = status;
      }
    }

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Agregar un comentario a una tarea existente
router.put("/:id/comments", authMiddleware, async (req, res) => {
  const { text } = req.body;
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const comment = { text };
    task.comments.push(comment);

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Edit a comment on a task
router.put("/:taskId/comments/:commentId", authMiddleware, async (req, res) => {
  const { text } = req.body;
  try {
    let task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const comment = task.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ msg: "Comment not found" });

    comment.text = text;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error("Error editing comment:", err); // Added detailed logging
    res.status(500).send("Server error");
  }
});

// Delete a comment on a task
router.delete(
  "/:taskId/comments/:commentId",
  authMiddleware,
  async (req, res) => {
    try {
      let task = await Task.findById(req.params.taskId);
      if (!task) return res.status(404).json({ msg: "Task not found" });

      if (task.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Not authorized" });
      }

      const comment = task.comments.id(req.params.commentId);
      if (!comment) return res.status(404).json({ msg: "Comment not found" });

      comment.remove();

      await task.save();
      res.json(task);
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

// Eliminar una tarea existente
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Task.findByIdAndRemove(req.params.id);
    res.json({ msg: "Task removed" });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
