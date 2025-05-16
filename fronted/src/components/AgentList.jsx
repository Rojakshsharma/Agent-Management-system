import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AgentList({ agents: initialAgents, deleteAgent }) {
  const [agents, setAgents] = useState(initialAgents || []);

  useEffect(() => {
    setAgents(initialAgents || []);
  }, [initialAgents]);

  // Wrap deleteAgent to include API call and toast here
  const handleDelete = async (email) => {
    try {
      const res = await fetch(`http://localhost:5000/agent/delete/${email}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Agent deleted successfully!");
        deleteAgent(email);  // Update Dashboard state
      } else {
        toast.error(data.message || "Failed to delete agent");
      }
    } catch (error) {
      toast.error("Error deleting agent");
      console.error(error);
    }
  };

  if (agents.length === 0) {
    return <p className="mt-6 text-gray-600">No agents found.</p>;
  }

  return (
    <div className="mt-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-blue-900 mb-4">Existing Agents</h2>
      <ul className="space-y-4">
        {agents.map(({ name, email, mobile }) => (
          <li
            key={email}
            className="flex justify-between items-center p-4 border border-gray-300 rounded-md"
          >
            <div>
              <p className="font-semibold">{name}</p>
              <p className="text-sm text-gray-600">{email}</p>
              <p className="text-sm text-gray-600">{mobile}</p>
            </div>
            <button
              onClick={() => handleDelete(email)}
              className="text-red-600 hover:text-red-800 font-semibold"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
