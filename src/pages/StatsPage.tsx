import React from "react";
import Stats from "../components/Stats";
import { Link } from "react-router-dom";

function StatsPage() {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-semibold">統計ダッシュボード</h2>
      <Stats />
      <div className="mt-6">
        <Link to="/" className="text-blue-500 hover:underline">
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}

export default StatsPage;
