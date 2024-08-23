import { useState, useEffect } from "react"; // Importing hooks from React for state management and side effects
import {
  Tabs,
  Tab,
  TextField,
  IconButton,
  Grid,
  Box,
  Typography,
} from "@mui/material"; // Importing Material-UI components
import AddIcon from "@mui/icons-material/Add"; // Importing the AddIcon component from Material-UI
import TaskCard from "../components/taskCard"; // Importing the TaskCard component

export default function Todos() {
  // State management
  const [tasks, setTasks] = useState([]); // State to store the list of tasks
  const [title, setTitle] = useState(""); // State for the title of a new task
  const [subtaskTitle, setSubtaskTitle] = useState(""); // State for the title of a new subtask
  const [commentText, setCommentText] = useState(""); // State for the text of a new comment
  const [editingTaskId, setEditingTaskId] = useState(null); // State to track the task being edited
  const [editingCommentId, setEditingCommentId] = useState(null); // State to track the comment being edited
  const [activeTab, setActiveTab] = useState("all"); // State to manage the active tab (all, pending, completed)

  // Effect to fetch tasks from the server when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to fetch tasks from the server
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5001/api/tasks", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Sending authorization header with the request
      },
    });
    const data = await res.json();
    console.log("API response:", data);

    if (Array.isArray(data)) {
      setTasks(data); // Set the fetched tasks in state
    } else {
      setTasks([]); // Clear tasks if the response is not an array
      console.error("Unexpected API response:", data);
    }
  };

  // Function to add a new task
  const addTask = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const res = await fetch("http://localhost:5001/api/tasks", {
      method: "POST", // HTTP method for creating a new task
      headers: {
        "Content-Type": "application/json", // Set the request content type to JSON
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Authorization header
      },
      body: JSON.stringify({ title }), // Send the task title in the request body
    });
    if (res.ok) {
      fetchTasks(); // Refresh tasks after successful addition
      setTitle(""); // Clear the task title input
    } else {
      console.error("Error adding task");
    }
  };

  // Function to edit an existing task
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
      method: "PUT", // HTTP method for updating an existing task
      headers: {
        "Content-Type": "application/json", // Set the request content type to JSON
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Authorization header
      },
      body: JSON.stringify({
        title: updatedTitle || task.title, // Use the updated title or keep the existing one
        status: updatedStatus || task.status, // Use the updated status or keep the existing one
        subtasks: updatedSubtasks || task.subtasks, // Use the updated subtasks or keep the existing ones
      }),
    });

    if (res.ok) {
      fetchTasks(); // Refresh tasks after successful edit
      setTitle(""); // Clear the task title input
      setEditingTaskId(null); // Reset the editing state
    } else {
      console.error("Error editing task");
    }
  };

  // Function to delete an existing task
  const deleteTask = async (taskId) => {
    const res = await fetch(`http://localhost:5001/api/tasks/${taskId}`, {
      method: "DELETE", // HTTP method for deleting a task
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Authorization header
      },
    });
    if (res.ok) {
      fetchTasks(); // Refresh tasks after successful deletion
    } else {
      console.error("Error deleting task");
    }
  };

  // Function to add a new subtask to an existing task
  const addSubtask = async (taskId, newSubtaskTitle) => {
    const task = tasks.find((task) => task._id === taskId);
    const updatedSubtasks = [
      ...task.subtasks,
      { title: newSubtaskTitle, status: "pending" }, // Add the new subtask with a pending status
    ];

    const res = await fetch(`http://localhost:5001/api/tasks/${taskId}`, {
      method: "PUT", // HTTP method for updating an existing task
      headers: {
        "Content-Type": "application/json", // Set the request content type to JSON
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Authorization header
      },
      body: JSON.stringify({ title: task.title, subtasks: updatedSubtasks }), // Send the updated subtasks in the request body
    });

    if (res.ok) {
      fetchTasks(); // Refresh tasks after successful addition of subtask
      setSubtaskTitle(""); // Clear the subtask title input
    } else {
      console.error("Error adding subtask");
    }
  };

  // Function to toggle the status of a task between 'pending' and 'completed'
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

  // Function to edit an existing subtask
  const editSubtask = async (taskId, subtaskIndex, newSubtaskTitle) => {
    const task = tasks.find((task) => task._id === taskId);
    const updatedSubtasks = task.subtasks.map((subtask, index) =>
      index === subtaskIndex ? { ...subtask, title: newSubtaskTitle } : subtask
    );

    const res = await fetch(`http://localhost:5001/api/tasks/${taskId}`, {
      method: "PUT", // HTTP method for updating an existing task
      headers: {
        "Content-Type": "application/json", // Set the request content type to JSON
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Authorization header
      },
      body: JSON.stringify({ title: task.title, subtasks: updatedSubtasks }), // Send the updated subtasks in the request body
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

  // Function to delete a subtask from an existing task
  const deleteSubtask = async (taskId, subtaskIndex) => {
    const task = tasks.find((task) => task._id === taskId);
    const updatedSubtasks = task.subtasks.filter(
      (_, index) => index !== subtaskIndex
    );

    const res = await fetch(`http://localhost:5001/api/tasks/${taskId}`, {
      method: "PUT", // HTTP method for updating an existing task
      headers: {
        "Content-Type": "application/json", // Set the request content type to JSON
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Authorization header
      },
      body: JSON.stringify({ title: task.title, subtasks: updatedSubtasks }), // Send the updated subtasks in the request body
    });

    if (res.ok) {
      fetchTasks(); // Refresh tasks after successful deletion of subtask
    } else {
      console.error("Error deleting subtask");
    }
  };

  // Function to toggle the status of a subtask between 'pending' and 'completed'
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
      method: "PUT", // HTTP method for updating an existing task
      headers: {
        "Content-Type": "application/json", // Set the request content type to JSON
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Authorization header
      },
      body: JSON.stringify({
        title: task.title,
        status: newTaskStatus,
        subtasks: updatedSubtasks,
      }), // Send the updated task status and subtasks in the request body
    });

    if (res.ok) {
      fetchTasks(); // Refresh tasks after successful toggling of subtask status
    } else {
      console.error("Error toggling subtask status");
    }
  };

  // Function to add a comment to a task
  const addComment = async (taskId, newCommentText) => {
    const res = await fetch(
      `http://localhost:5001/api/tasks/${taskId}/comments`,
      {
        method: "PUT", // HTTP method for adding a comment to a task
        headers: {
          "Content-Type": "application/json", // Set the request content type to JSON
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Authorization header
        },
        body: JSON.stringify({ text: newCommentText }), // Send the comment text in the request body
      }
    );
    if (res.ok) {
      fetchTasks(); // Refresh tasks after successful addition of comment
      setCommentText(""); // Clear the comment input field
    } else {
      console.error("Error adding comment");
    }
  };

  // Function to edit an existing comment on a task
  const editComment = async (taskId, commentId, updatedCommentText) => {
    const res = await fetch(
      `http://localhost:5001/api/tasks/${taskId}/comments/${commentId}`,
      {
        method: "PUT", // HTTP method for editing a comment
        headers: {
          "Content-Type": "application/json", // Set the request content type to JSON
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Authorization header
        },
        body: JSON.stringify({ text: updatedCommentText }), // Send the updated comment text in the request body
      }
    );
    if (res.ok) {
      fetchTasks(); // Refresh tasks to reflect the update
      setCommentText(""); // Clear the comment text input
      setEditingCommentId(null); // Reset the editing state
    } else {
      console.error("Error editing comment");
    }
  };

  // Function to delete a comment from a task
  const deleteComment = async (taskId, commentId) => {
    const res = await fetch(
      `http://localhost:5001/api/tasks/${taskId}/comments/${commentId}`,
      {
        method: "DELETE", // HTTP method for deleting a comment
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Authorization header
        },
      }
    );
    if (res.ok) {
      fetchTasks(); // Refresh tasks after successful deletion of comment
    } else {
      console.error("Error deleting comment");
    }
  };

  // Filter tasks based on the active tab (all, pending, completed)
  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "pending") return task.status === "pending";
    if (activeTab === "completed") return task.status === "completed";
    return true; // Return all tasks if the active tab is "all"
  });

  // Format the current date to display
  const currentDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "2-digit",
    year: "numeric",
  }).format(new Date());

  return (
    <Box m={3}>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography
            sx={{
              fontSize: { xs: "24px", md: "48px", lg: "64px" },
              fontWeight: "bold",
            }}
          >
            My ToDo List
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography
            variant="h6"
            align="right"
            sx={{ marginTop: { xs: "8px", md: "16px", lg: "24px" } }}
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
              sx={{ fontSize: { xs: "14px", md: "16px" } }}
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
              <AddIcon fontSize="large" sx={{ color: "#F50057" }} />
            </IconButton>
          </Grid>
        </Grid>
      </form>
      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        aria-label="task filter tabs"
        sx={{ fontSize: { xs: "12px", md: "14px" } }}
      >
        <Tab value="all" label="All" />
        <Tab value="pending" label="Pending" />
        <Tab value="completed" label="Completed" />
      </Tabs>
      <Grid container spacing={2} mt={2}>
        {filteredTasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={task._id}>
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
