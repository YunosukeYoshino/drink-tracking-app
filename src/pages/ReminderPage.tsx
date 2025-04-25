import React from "react";
import GoalReminder from "../components/GoalReminder";
import { Link } from "react-router-dom";

function ReminderPage() {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-semibold">リマインダー設定</h2>
      <GoalReminder />
      <div className="mt-6">
        <Link to="/" className="text-blue-500 hover:underline">
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}

export default ReminderPage;
