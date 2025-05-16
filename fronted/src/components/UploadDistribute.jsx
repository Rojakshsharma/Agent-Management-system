import { useState } from "react";
import Papa from "papaparse";
import toast from "react-hot-toast";

export default function UploadDistribute({ agents }) {
  const [file, setFile] = useState(null);
  const [distributedLists, setDistributedLists] = useState(null);

  const allowedTypes = [
    "text/csv",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Only CSV, XLS, XLSX files are allowed");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const sendDistributedData = async (distributed) => {
    try {
      const response = await fetch("http://localhost:5000/tasks/distribute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ distributed }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Tasks saved successfully!");
      } else {
        toast.error(result.message || "Failed to save tasks.");
      }
    } catch (error) {
      toast.error("Error sending data to server: " + error.message);
    }
  };

  const parseAndDistribute = () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const data = results.data;

        const requiredCols = ["FirstName", "Phone", "Notes"];
        const keys = Object.keys(data[0] || {});
        const hasAllCols = requiredCols.every((col) => keys.includes(col));
        if (!hasAllCols) {
          toast.error("CSV missing required columns: FirstName, Phone, Notes");
          return;
        }

        if (agents.length < 5) {
          toast.error("You need at least 5 agents to distribute tasks.");
          return;
        }

        const distributed = {};
        for (let i = 0; i < 5; i++) {
          distributed[agents[i].email] = [];
        }

        data.forEach((item, idx) => {
          const agentIndex = idx % 5;
          distributed[agents[agentIndex].email].push(item);
        });

        setDistributedLists(distributed);
        toast.success("Tasks distributed among agents!");

        sendDistributedData(distributed);
      },
      error: (err) => {
        toast.error("Failed to parse file: " + err.message);
      },
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 rounded-xl shadow-md mt-8">
      <h2 className="text-2xl font-semibold text-blue-900 mb-4">
        Upload CSV/XLSX to Distribute Lists
      </h2>

      <input
        type="file"
        accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={parseAndDistribute}
        className="bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition"
      >
        Upload & Distribute
      </button>

      {distributedLists && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Distributed Lists</h3>
          <div className="space-y-6 max-h-96 overflow-y-auto">
            {Object.entries(distributedLists).map(([agentEmail, tasks]) => (
              <div key={agentEmail} className="bg-white p-4 rounded shadow">
                <h4 className="font-bold text-blue-900">{agentEmail}</h4>
                <ul className="list-disc list-inside">
                  {tasks.map((task, idx) => (
                    <li key={idx}>
                      <span className="font-semibold">{task.FirstName}</span> - {task.Phone} - {task.Notes}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
