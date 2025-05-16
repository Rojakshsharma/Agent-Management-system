const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/UserRoute.js");
const agentRoutes = require("./routes/AgentRoute.js")
const taskRoutes = require('./routes/taskRoutes.js');


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.json({ message: "✅ Log route working" });
});

// Load routes
app.use("/api", userRoutes);
app.use('/agent', agentRoutes);
app.use('/tasks', taskRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
