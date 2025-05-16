import { useState, useEffect } from "react";
import AddAgent from "./Agent";
import AgentList from "./AgentList";
import UploadDistribute from "./UploadDistribute";

export default function Dashboard() {
  const [agents, setAgents] = useState([]);
  const [activeSection, setActiveSection] = useState("add");

  useEffect(() => {
    async function fetchAgents() {
      try {
        const res = await fetch("http://localhost:5000/agent/list");
        if (!res.ok) throw new Error("Failed to fetch agents");
        const data = await res.json();
        setAgents(data.agents || []);  // Assuming API returns { agents: [...] }
        console.log("Fetched agents:", data.agents);
      } catch (error) {
        console.error(error);
      }
    }
    fetchAgents();
  }, []);

  const addAgent = (newAgent) => {
    setAgents((prev) => [...prev, newAgent]);
  };

  const deleteAgent = (email) => {
    setAgents((prev) => prev.filter((agent) => agent.email !== email));
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <button
          onClick={() => setActiveSection("add")}
          className={`block w-full text-left py-2 px-4 rounded ${
            activeSection === "add" ? "bg-blue-700" : "hover:bg-blue-800"
          }`}
        >
          Add Agent
        </button>
        <button
          onClick={() => setActiveSection("list")}
          className={`block w-full text-left py-2 px-4 rounded ${
            activeSection === "list" ? "bg-blue-700" : "hover:bg-blue-800"
          }`}
        >
          Show Agent List
        </button>
        <button
          onClick={() => setActiveSection("distribute")}
          className={`block w-full text-left py-2 px-4 rounded ${
            activeSection === "distribute" ? "bg-blue-700" : "hover:bg-blue-800"
          }`}
        >
          Distribute Tasks
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeSection === "add" && <AddAgent addAgent={addAgent} />}
        {activeSection === "list" && (
          <AgentList agents={agents} deleteAgent={deleteAgent} />
        )}
        {activeSection === "distribute" && <UploadDistribute agents={agents} />}
      </div>
    </div>
  );
}
