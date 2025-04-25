import React, { useEffect, useState } from "react";
import { GlassWater } from "lucide-react";
// Removed unused imports: DrinkForm, DrinkList, Stats
// Removed GoalReminder import, moved to ReminderPage
import { supabase } from "./lib/supabase";
import { Link, Outlet } from "react-router-dom"; // Import Link and Outlet
// Removed BrowserRouter import as routing is handled in main.tsx

function App() {
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        // Optionally redirect to login or show login modal
        console.log("ユーザーがログインしていません");
      }
    };
    checkUser();
  }, []);

  const handleDrinkAdded = () => {
    setRefresh(!refresh);
  };

  return (
    // App component now acts as a layout
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-100 to-blue-200 p-4 sm:p-6 md:p-8">
      <header className="mb-8 w-full max-w-lg text-center">
        <GlassWater className="mx-auto mb-2 h-12 w-12 text-blue-500 sm:mb-4 sm:h-16 sm:w-16" />
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl md:text-4xl">
          ドリンクトラッカー
        </h1>
        <p className="text-sm text-gray-600 sm:text-base">
          毎日の水分摂取を記録しましょう
        </p>
        <nav className="mt-4 flex justify-center space-x-4">
          <Link to="/" className="text-blue-600 hover:underline">
            ホーム
          </Link>
          <Link to="/reminder" className="text-blue-600 hover:underline">
            リマインダー
          </Link>
          <Link to="/stats" className="text-blue-600 hover:underline">
            統計
          </Link>
        </nav>
      </header>
      <main className="w-full max-w-xs sm:max-w-md md:max-w-lg">
        {/* Render the matched child route's element */}
        <Outlet context={{ onDrinkAdded: handleDrinkAdded }} />
      </main>
    </div>
  );
}

export default App;
