const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String },
  assignedTo: { type: String, required: true }, // agent email
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
