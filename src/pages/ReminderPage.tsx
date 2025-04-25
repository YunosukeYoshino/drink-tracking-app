import React from "react";
import GoalReminder from "../components/GoalReminder";
import { Link } from "react-router-dom";

function ReminderPage() {
  return (
    <div className="w-full max-w-md p-4 space-y-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800">Reminder Settings</h2>
      <div className="space-y-4">
        <GoalReminder /> {/* Assuming this handles reminder inputs; enhance if needed */}
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500" aria-label="Enable reminders" />
          <span className="text-gray-700">Enable Reminders</span>
        </label>
        <input type="time" className="w-full p-2 border border-gray-300 rounded" placeholder="Set reminder time" aria-label="Reminder time" />
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" aria-label="Save reminders">
          Save
        </button>
        <Link to="/" className="text-blue-500 hover:underline" aria-label="Back to home">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default ReminderPage;
