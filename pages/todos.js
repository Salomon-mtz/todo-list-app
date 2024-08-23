import { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  TextField,
  IconButton,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskCard from "../components/taskCard";

export default function Todos() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [subtaskTitle, setSubtaskTitle] = useState(""); // For new subtasks
  const [commentText, setCommentText] = useState(""); // For new comments
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null); // For editing comments
  const [activeTab, setActiveTab] = useState("all"); // To manage which tab is active

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5001/api/tasks", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    console.log("API response:", data);

    if (Array.isArray(data)) {
      setTasks(data);
    } else {
      setTasks([]);
      console.error("Unexpected API response:", data);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5001/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title }),
    });
    if (res.ok) {
      fetchTasks();
      setTitle("");
    } else {
      console.error("Error adding task");
    }
  };

  const editTask = async (
    taskId,
    updatedTitle = title,
    updatedSubtasks = null,
    updatedStatus = null
  ) => {
    const task = tasks.find((t) => t._id === taskId);

    if (!task) {
      console.error("Task not found with ID:", taskId);
      return;
    }

    const res = await fetch(`http://localhost:5001/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: updatedTitle || task.title,
        status: updatedStatus || task.status,
        subttasks: updatedSubtasks || task.subtasks,
      }),
    });

    if (res.ok) {
      fetchTasks();
      setTitle("");
      setEditingTaskId(null);
    } else {
      console.error("Error editing task");
    }
  };

  const deleteTask = async (taskId) => {
    const res = await fetch(`http://localhost:5001/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.ok) {
      fetchTasks();
    } else {
      console.error("Error deleting task");
    }
  };

  const addSubtask = async (taskId, newSubtaskTitle) => {
    const task = tasks.find((task) => task._id === taskId);
    const updatedSubtasks = [
      ...task.subtasks,
      { title: newSubtaskTitle, status: "pending" },
    ];

    const res = await fetch(`http://localhost:5001/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title: task.title, subtasks: updatedSubtasks }),
    });

    if (res.ok) {
      fetchTasks();
      setSubtaskTitle(""); // Clear the subtask input field
    } else {
      console.error("Error adding subtask");
    }
  };

  const toggleTaskStatus = (task) => {
    const newStatus = task.status === "pending" ? "completed" : "pending";
    editTask(
      task._id,
      task.title, // Keep the current title
      task.subtasks.map((subtask) => ({
        ...subtask,
        status:
          subtask.status === "pending" && newStatus === "completed"
            ? "completed"
            : subtask.status,
      })),
      newStatus // Pass the new status
    );
  };

  const editSubtask = async (taskId, subtaskIndex, newSubtaskTitle) => {
    const task = tasks.find((task) => task._id === taskId);
    const updatedSubtasks = task.subtasks.map((subtask, index) =>
      index === subtaskIndex ? { ...subtask, title: newSubtaskTitle } : subtask
    );

    const res = await fetch(`http://localhost:5001/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title: task.title, subtasks: updatedSubtasks }),
    });

    if (res.ok) {
      // Update the local state to reflect the edited subtask
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t._id === taskId ? { ...t, subtasks: updatedSubtasks } : t
        )
      );
    } else {
      console.error("Error editing subtask");
    }
  };

  const deleteSubtask = async (taskId, subtaskIndex) => {
    const task = tasks.find((task) => task._id === taskId);
    const updatedSubtasks = task.subtasks.filter(
      (_, index) => index !== subtaskIndex
    );

    const res = await fetch(`http://localhost:5001/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title: task.title, subtasks: updatedSubtasks }),
    });

    if (res.ok) {
      fetchTasks();
    } else {
      console.error("Error deleting subtask");
    }
  };

  const toggleSubtaskStatus = async (taskId, subtaskIndex) => {
    const task = tasks.find((task) => task._id === taskId);
    const updatedSubtasks = task.subtasks.map((subtask, index) =>
      index === subtaskIndex
        ? {
            ...subtask,
            status: subtask.status === "pending" ? "completed" : "pending",
          }
        : subtask
    );

    // Update the task status based on subtasks completion
    const allSubtasksCompleted = updatedSubtasks.every(
      (subtask) => subtask.status === "completed"
    );
    const newTaskStatus = allSubtasksCompleted ? "completed" : "pending";

    const res = await fetch(`http://localhost:5001/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: task.title,
        status: newTaskStatus,
        subtasks: updatedSubtasks,
      }),
    });

    if (res.ok) {
      fetchTasks();
    } else {
      console.error("Error toggling subtask status");
    }
  };

  const addComment = async (taskId, newCommentText) => {
    const res = await fetch(
      `http://localhost:5001/api/tasks/${taskId}/comments`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ text: newCommentText }),
      }
    );
    if (res.ok) {
      fetchTasks();
      setCommentText(""); // Clear the comment input field
    } else {
      console.error("Error adding comment");
    }
  };

  const editComment = async (taskId, commentId, updatedCommentText) => {
    const res = await fetch(
      `http://localhost:5001/api/tasks/${taskId}/comments/${commentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ text: updatedCommentText }),
      }
    );
    if (res.ok) {
      fetchTasks(); // Refresh the tasks to reflect the update
      setCommentText(""); // Clear the comment text input
      setEditingCommentId(null); // Reset the editing state
    } else {
      console.error("Error editing comment");
    }
  };

  const deleteComment = async (taskId, commentId) => {
    const res = await fetch(
      `http://localhost:5001/api/tasks/${taskId}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res.ok) {
      fetchTasks();
    } else {
      console.error("Error deleting comment");
    }
  };

  // Filter tasks based on active tab
  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "pending") return task.status === "pending";
    if (activeTab === "completed") return task.status === "completed";
    return true; // Return all tasks if the active tab is "all"
  });

  const currentDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "2-digit",
    year: "numeric",
  }).format(new Date());

  return (
    <Box m={12}>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography sx={{ fontSize: { xs: "32px", md: "64px", lg: "80px" } }}>
            My ToDo List
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography
            variant="h6"
            align="right"
            sx={{ marginTop: { xs: "16px", md: "32px", lg: "40px" } }}
          >
            {currentDate}
          </Typography>
        </Grid>
      </Grid>
      <form onSubmit={addTask}>
        <Grid container alignItems="center" mb={4}>
          <Grid item xs={10}>
            <TextField
              label="New Task"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton
              type="submit"
              color="primary"
              aria-label="add task"
              size="large"
              sx={{ mt: 1 }}
            >
              <AddIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </form>
      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        aria-label="task filter tabs"
      >
        <Tab value="all" label="All" />
        <Tab value="pending" label="Pending" />
        <Tab value="completed" label="Completed" />
      </Tabs>
      <Grid container spacing={2} mt={2}>
        {filteredTasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={task._id}>
            <TaskCard
              task={task}
              onEditTask={editTask}
              onDeleteTask={deleteTask}
              onToggleTaskStatus={toggleTaskStatus}
              onAddSubtask={addSubtask}
              onDeleteSubtask={deleteSubtask}
              onToggleSubtaskStatus={toggleSubtaskStatus}
              onAddComment={addComment}
              onEditComment={editComment}
              onDeleteComment={deleteComment}
              onEditSubtask={editSubtask}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
