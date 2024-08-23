import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  Modal,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  ListItemIcon,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import AddIcon from "@mui/icons-material/Add";

export default function TaskCard({
  task,
  onEditTask,
  onDeleteTask,
  onToggleTaskStatus,
  onAddSubtask,
  onEditSubtask,
  onDeleteSubtask,
  onToggleSubtaskStatus,
  onAddComment,
  onEditComment,
  onDeleteComment,
}) {
  // State management for modal visibility and form fields
  const [open, setOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title); // For editing task title
  const [subtaskTitle, setSubtaskTitle] = useState(""); // For new subtask or editing subtask
  const [editingSubtaskIndex, setEditingSubtaskIndex] = useState(null); // For editing subtask
  const [commentText, setCommentText] = useState(""); // For new and editing comments
  const [editingCommentId, setEditingCommentId] = useState(null); // For editing comments

  // Function to open the modal
  const handleOpen = () => setOpen(true);

  // Function to close the modal and reset form states
  const handleClose = () => {
    setOpen(false);
    handleCancelEdit(); // Reset editing states when closing the modal
  };

  // Function to prepare a comment for editing
  const handleEditCommentClick = (comment, index) => {
    setCommentText(comment.text);
    setEditingCommentId(comment._id);
  };

  // Function to save changes made to the task title
  const handleSaveChanges = () => {
    onEditTask(task._id, editedTitle);
    handleClose();
  };

  // Function to prepare a subtask for editing
  const handleEditSubtaskClick = (subtask, index) => {
    setSubtaskTitle(subtask.title); // Set the current title of the subtask in the input field
    setEditingSubtaskIndex(index); // Set the index of the subtask being edited
  };

  // Function to save changes made to a subtask
  const handleSaveSubtaskChanges = () => {
    if (editingSubtaskIndex !== null) {
      onEditSubtask(task._id, editingSubtaskIndex, subtaskTitle);
      handleCancelEdit(); // Reset editing state after saving changes
    }
  };

  // Function to save changes made to a comment
  const handleSaveCommentChanges = () => {
    if (editingCommentId !== null) {
      onEditComment(task._id, editingCommentId, commentText);
      handleCancelEdit(); // Reset editing state after saving changes
    }
  };

  // Function to reset all editing states and clear input fields
  const handleCancelEdit = () => {
    setEditingSubtaskIndex(null); // Reset the editing subtask index
    setSubtaskTitle(""); // Clear the subtask title input
    setEditingCommentId(null); // Reset the editing comment ID
    setCommentText(""); // Clear the comment text input
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%", // Responsive width
    maxWidth: 500, // Maximum width
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 8,
    p: { xs: 2, md: 4 }, // Responsive padding
    overflowY: "auto", // Ensures content doesn't overflow on smaller screens
    maxHeight: "90vh", // Ensures the modal doesn't exceed the viewport height
  };

  return (
    <>
      <Card
        onClick={handleOpen}
        sx={{
          marginBottom: 2,
          cursor: "pointer",
          borderRadius: 4,
          padding: { xs: 1, md: 2 },
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" }, // Column for small screens, row for larger
          }}
        >
          <Typography
            variant="h5"
            component="h5"
            sx={{ fontSize: { xs: "20px", md: "32px" }, fontWeight: "bold" }}
          >
            {task.title}
          </Typography>
          <Checkbox
            checked={task.status === "completed"}
            onClick={(e) => {
              e.stopPropagation();
              onToggleTaskStatus(task);
            }}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleIcon />}
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: { xs: 24, md: 28 }, // Responsive icon size
                borderRadius: "50%",
                color: "#F50057",
              },
              mt: { xs: 1, md: 0 }, // Margin top for mobile
            }}
          />
        </CardContent>

        {/* Subtasks Section */}
        <Box sx={{ padding: { xs: 1, md: 2 } }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            Subtasks:
          </Typography>
          <List>
            {task.subtasks.map((subtask, index) => (
              <ListItem key={index}>
                <ListItemIcon>{index + 1}.</ListItemIcon>
                <ListItemText primary={subtask.title} />
              </ListItem>
            ))}
          </List>

          {/* Comments Section */}
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            Comments:
          </Typography>
          <List>
            {task.comments.map((comment, index) => (
              <ListItem key={index}>
                <ListItemIcon>•</ListItemIcon>
                <ListItemText primary={comment.text} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: 2,
            paddingBottom: 1,
            gap: 1, // Add some spacing between icons
          }}
        >
          <IconButton
            aria-label="edit"
            onClick={(e) => {
              e.stopPropagation();
              handleOpen();
            }}
          >
            <EditIcon sx={{ color: "#F50057" }} />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteTask(task._id);
            }}
          >
            <DeleteIcon sx={{ color: "#F50057" }} />
          </IconButton>
        </Box>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="task-modal-title"
        aria-describedby="task-modal-description"
      >
        <Box sx={style}>
          <Typography id="task-modal-title" variant="h6" component="h2">
            Edit Task
          </Typography>
          <TextField
            label="Task Title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ fontSize: { xs: "14px", md: "16px" } }}
          />
          <Box sx={{ justifyContent: "end", display: "flex" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveChanges}
              sx={{
                mt: 2,
                mb: 2,
                textTransform: "none",
                borderRadius: 10,
                backgroundColor: "#F50057",
                "&:hover": { backgroundColor: "#C51162" },
                fontSize: { xs: "14px", md: "16px" },
              }}
            >
              Save Changes
            </Button>
          </Box>

          <Typography
            variant="h6"
            mt={2}
            sx={{ fontSize: { xs: "16px", md: "18px" } }}
          >
            Subtasks
          </Typography>
          <List>
            {task.subtasks.map((subtask, index) => (
              <ListItem key={index} disablePadding>
                <Checkbox
                  checked={subtask.status === "completed"}
                  onChange={() => onToggleSubtaskStatus(task._id, index)}
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircleIcon />}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: { xs: 20, md: 24 },
                      borderRadius: "50%",
                      color: "#F50057",
                    },
                  }}
                />
                <ListItemText
                  primary={subtask.title}
                  sx={{ fontSize: { xs: "14px", md: "16px" } }}
                />
                <IconButton
                  aria-label="edit"
                  onClick={() => handleEditSubtaskClick(subtask, index)}
                >
                  <EditIcon
                    sx={{ color: "#F50057", fontSize: { xs: 18, md: 24 } }}
                  />
                </IconButton>

                <IconButton
                  aria-label="delete"
                  onClick={() => onDeleteSubtask(task._id, index)}
                >
                  <DeleteIcon
                    sx={{ color: "#F50057", fontSize: { xs: 18, md: 24 } }}
                  />
                </IconButton>
              </ListItem>
            ))}
          </List>

          {editingSubtaskIndex !== null && (
            <Box mt={2}>
              <TextField
                label="Edit Subtask"
                value={subtaskTitle}
                onChange={(e) => setSubtaskTitle(e.target.value)}
                fullWidth
              />
              <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveSubtaskChanges}
                  sx={{
                    mt: 2,
                    mb: 2,
                    mr: 2,
                    textTransform: "none",
                    borderRadius: 10,
                    backgroundColor: "#F50057",
                    "&:hover": { backgroundColor: "#C51162" },
                    fontSize: { xs: "14px", md: "16px" },
                  }}
                >
                  Save Subtask
                </Button>
                <Button
                  variant="text"
                  color="secondary"
                  onClick={handleCancelEdit}
                  sx={{
                    mt: 2,
                    mb: 2,
                    textTransform: "none",
                    borderRadius: 10,
                    color: "#F50057",
                    fontSize: { xs: "14px", md: "16px" },
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          )}

          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              onAddSubtask(task._id, subtaskTitle);
              setSubtaskTitle(""); // Clear the subtask input field after adding
            }}
            sx={{ display: "flex", alignItems: "center", mt: 2 }}
          >
            <TextField
              label="Add a subtask"
              value={subtaskTitle}
              onChange={(e) => setSubtaskTitle(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <IconButton type="submit" color="primary">
              <AddIcon
                sx={{ color: "#F50057", fontSize: { xs: 20, md: 24 } }}
              />
            </IconButton>
          </Box>

          <Typography
            variant="h6"
            mt={2}
            sx={{ fontSize: { xs: "16px", md: "18px" } }}
          >
            Comments
          </Typography>
          <List>
            {task.comments.map((comment, index) => (
              <ListItem key={index} disablePadding>
                <ListItemText
                  primary={comment.text}
                  sx={{ fontSize: { xs: "14px", md: "16px" } }}
                />
                <IconButton
                  aria-label="edit"
                  onClick={() => handleEditCommentClick(comment, index)}
                >
                  <EditIcon
                    sx={{ color: "#F50057", fontSize: { xs: 18, md: 24 } }}
                  />
                </IconButton>

                <IconButton
                  aria-label="delete"
                  onClick={() => onDeleteComment(task._id, comment._id)}
                >
                  <DeleteIcon
                    sx={{ color: "#F50057", fontSize: { xs: 18, md: 24 } }}
                  />
                </IconButton>
              </ListItem>
            ))}
          </List>

          {editingCommentId !== null && (
            <Box mt={2}>
              <TextField
                label="Edit Comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                fullWidth
              />
              <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveCommentChanges}
                  sx={{
                    mt: 2,
                    mb: 2,
                    mr: 2,
                    textTransform: "none",
                    borderRadius: 10,
                    backgroundColor: "#F50057",
                    "&:hover": { backgroundColor: "#C51162" },
                    fontSize: { xs: "14px", md: "16px" },
                  }}
                >
                  Save Comment
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancelEdit}
                  sx={{
                    mt: 2,
                    mb: 2,
                    textTransform: "none",
                    borderRadius: 10,
                    color: "#F50057",
                    fontSize: { xs: "14px", md: "16px" },
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          )}

          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              onAddComment(task._id, commentText);
              setCommentText(""); // Clear the comment input field after adding
            }}
            sx={{ display: "flex", alignItems: "center", mt: 2 }}
          >
            <TextField
              label="Add a comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <IconButton type="submit" color="primary">
              <AddIcon
                sx={{ color: "#F50057", fontSize: { xs: 20, md: 24 } }}
              />
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
