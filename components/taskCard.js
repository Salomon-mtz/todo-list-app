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
  const [open, setOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title); // For editing task title
  const [subtaskTitle, setSubtaskTitle] = useState(""); // For new subtask or editing subtask
  const [editingSubtaskIndex, setEditingSubtaskIndex] = useState(null); // For editing subtask
  const [commentText, setCommentText] = useState(""); // For new and editing comments
  const [editingCommentId, setEditingCommentId] = useState(null); // For editing comments

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    handleCancelEdit(); // Reset editing states when closing the modal
  };

  const handleEditCommentClick = (comment, index) => {
    setCommentText(comment.text);
    setEditingCommentId(comment._id);
  };

  const handleSaveChanges = () => {
    onEditTask(task._id, editedTitle);
    handleClose();
  };

  const handleEditSubtaskClick = (subtask, index) => {
    setSubtaskTitle(subtask.title); // Set the current title of the subtask in the input field
    setEditingSubtaskIndex(index); // Set the index of the subtask being edited
  };

  const handleSaveSubtaskChanges = () => {
    if (editingSubtaskIndex !== null) {
      onEditSubtask(task._id, editingSubtaskIndex, subtaskTitle);
      handleCancelEdit(); // Reset editing state after saving changes
    }
  };

  const handleSaveCommentChanges = () => {
    if (editingCommentId !== null) {
      onEditComment(task._id, editingCommentId, commentText);
      handleCancelEdit(); // Reset editing state after saving changes
    }
  };

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
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 8,
    p: 8,
  };

  return (
    <>
      <Card
        onClick={handleOpen}
        sx={{ marginBottom: 2, cursor: "pointer", borderRadius: 4 }}
      >
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h3"
            component="h3"
            sx={{ fontSize: "32px", fontWeight: "bold" }}
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
                fontSize: 28, // Increase the size to make it more prominent
                borderRadius: "50%", // Make the icon circular
                color: "#F50057", // Use a consistent color for both states
              },
            }}
          />
        </CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: 2,
            paddingBottom: 1,
          }}
        >
          <IconButton
            aria-label="edit"
            onClick={(e) => {
              e.stopPropagation();
              handleOpen(); // Open the modal to edit the task name
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
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveChanges}
            sx={{ mt: 2 }}
          >
            Save Changes
          </Button>

          <Typography variant="h6" mt={2}>
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
                      fontSize: 24, // Adjust the size as necessary
                      borderRadius: "50%", // Ensure it's circular
                      color: "#F50057", // Use a consistent color for both states
                    },
                  }}
                />
                <ListItemText primary={subtask.title} />
                <IconButton
                  aria-label="edit"
                  onClick={() => handleEditSubtaskClick(subtask, index)}
                >
                  <EditIcon sx={{ color: "#F50057" }} />
                </IconButton>

                <IconButton
                  aria-label="delete"
                  onClick={() => onDeleteSubtask(task._id, index)}
                >
                  <DeleteIcon sx={{ color: "#F50057" }} />
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
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveSubtaskChanges}
                >
                  Save Subtask
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancelEdit}
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
              <AddIcon sx={{ color: "#F50057" }} />
            </IconButton>
          </Box>

          <Typography variant="h6" mt={2}>
            Comments
          </Typography>
          <List>
            {task.comments.map((comment, index) => (
              <ListItem key={index} disablePadding>
                <ListItemText primary={comment.text} />
                <IconButton
                  aria-label="edit"
                  onClick={() => handleEditCommentClick(comment, index)}
                >
                  <EditIcon sx={{ color: "#F50057" }} />
                </IconButton>

                <IconButton
                  aria-label="delete"
                  onClick={() => onDeleteComment(task._id, comment._id)}
                >
                  <DeleteIcon sx={{ color: "#F50057" }} />
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
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveCommentChanges}
                >
                  Save Comment
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancelEdit}
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
              <AddIcon sx={{ color: "#F50057" }} />
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
