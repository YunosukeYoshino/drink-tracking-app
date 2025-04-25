import React from "react";
import Stats from "../components/Stats";
import { Link } from "react-router-dom";

function StatsPage() {
  return (
    <div className="w-full max-w-md p-4 space-y-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800">Statistics Dashboard</h2>
      <div className="space-y-4">
        <Stats /> {/* Enhance or assume this includes graphs; add placeholders if needed */}
        <div className="w-full h-64 bg-gray-100 rounded" aria-label="Sample stats graph">
          {/* Placeholder for graph - in a real scenario, integrate a library like Chart.js */}
          <p className="text-gray-600 text-center">Graph showing daily intake trends</p>
        </div>
        <Link to="/" className="text-blue-500 hover:underline" aria-label="Back to home">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default StatsPage;
