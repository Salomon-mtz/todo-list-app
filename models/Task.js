const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const SubtaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, default: 'pending' }, 
});

const TaskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'pending' },
  subtasks: [SubtaskSchema],
  comments: [CommentSchema]
});

module.exports = mongoose.model('Task', TaskSchema);
