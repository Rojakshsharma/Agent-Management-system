const Task = require('../models/Task');

exports.distributeTasks = async (req, res) => {
  try {
    const { distributed } = req.body;

    if (!distributed) {
      return res.status(400).json({ message: 'No tasks to distribute' });
    }

    // Optional: Clear previous tasks before saving new ones
    await Task.deleteMany({});

    const tasksToInsert = [];

    for (const [agentEmail, tasks] of Object.entries(distributed)) {
      for (const task of tasks) {
        tasksToInsert.push({
          firstName: task.FirstName,
          phone: task.Phone,
          notes: task.Notes,
          assignedTo: agentEmail,
        });
      }
    }

    await Task.insertMany(tasksToInsert);

    res.status(200).json({ message: 'Tasks distributed and saved successfully' });
  } catch (error) {
    console.error('Error in distributeTasks:', error);
    res.status(500).json({ message: 'Server error while distributing tasks' });
  }
};
