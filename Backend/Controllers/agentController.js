const bcrypt = require("bcryptjs");
const Agent = require('../models/Agent');

const signupAgent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const agent = new Agent({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    await agent.save();

    res.status(201).json({ message: 'Agent registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getAgentList = async (req, res) => {
  try {
    const agents = await Agent.find({}, '-password'); // exclude password
    res.status(200).json({ agents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const deleteAgent = async (req, res) => {
  try {
    const { email } = req.params;

    const deletedAgent = await Agent.findOneAndDelete({ email });
    if (!deletedAgent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    res.status(200).json({ message: 'Agent deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { signupAgent  , getAgentList , deleteAgent};
