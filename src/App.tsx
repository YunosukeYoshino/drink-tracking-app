import React, { useEffect, useState } from 'react';
import { GlassWater } from 'lucide-react';
import DrinkForm from './components/DrinkForm';
import DrinkList from './components/DrinkList';
import Stats from './components/Stats';
import GoalReminder from './components/GoalReminder';
import { supabase } from './lib/supabase';

function App() {
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        // Optionally redirect to login or show login modal
        console.log('ユーザーがログインしていません');
      }
    };
    checkUser();
  }, []);

  const handleDrinkAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <header className="mb-8 text-center">
        <GlassWater className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500 mx-auto mb-2 sm:mb-4" />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">ドリンクトラッカー</h1>
        <p className="text-gray-600 text-sm sm:text-base">毎日の水分摂取を記録しましょう</p>
      </header>
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg space-y-6">
        <DrinkForm onDrinkAdded={handleDrinkAdded} />
        <GoalReminder />
        <Stats />
        <DrinkList />
      </div>
    </div>
  );
}

export default App;
