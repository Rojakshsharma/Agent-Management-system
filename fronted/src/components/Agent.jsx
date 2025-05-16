import { useState } from "react";
import toast from "react-hot-toast";

export default function AddAgent({ addAgent }) {
  const [agent, setAgent] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) => {
    setAgent((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, mobile, password } = agent;

    if (!name || !email || !mobile || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/agent/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, mobile, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Agent added successfully!");
        setAgent({ name: "", email: "", mobile: "", password: "" });
        // Optionally add agent to parent component state
        addAgent && addAgent(data.agent); // if your backend returns the created agent
      } else {
        toast.error(data.message || "Failed to add agent");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-blue-900 mb-6">Add New Agent</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={agent.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="email"
          name="email"
          value={agent.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="tel"
          name="mobile"
          value={agent.mobile}
          onChange={handleChange}
          placeholder="Mobile Number (with country code)"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="password"
          name="password"
          value={agent.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition"
        >
          Add Agent
        </button>
      </form>
    </div>
  );
}
