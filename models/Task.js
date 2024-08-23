const mongoose = require('mongoose');

// Define the schema for comments associated with a task
const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true }, // The content of the comment (required)
  createdAt: { type: Date, default: Date.now } // Timestamp of when the comment was created (default: current time)
});

// Define the schema for subtasks within a task
const SubtaskSchema = new mongoose.Schema({
  title: { type: String, required: true }, // The title of the subtask (required)
  status: { type: String, default: 'pending' }, // The status of the subtask (default: 'pending')
});

// Define the main schema for tasks
const TaskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who created the task (required)
  title: { type: String, required: true }, // The title of the task (required)
  description: { type: String }, // Optional description of the task
  status: { type: String, default: 'pending' }, // The status of the task (default: 'pending')
  subtasks: [SubtaskSchema], // Array of subtasks associated with the task
  comments: [CommentSchema] // Array of comments associated with the task
});

// Export the Task model to be used in the application
module.exports = mongoose.model('Task', TaskSchema);
