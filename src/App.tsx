import React, { useEffect, useState } from 'react';
import { GlassWater } from 'lucide-react';
import DrinkForm from './components/DrinkForm';
import DrinkList from './components/DrinkList';
import Stats from './components/Stats';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col items-center justify-center p-4">
      <header className="mb-8 text-center">
        <GlassWater className="w-16 h-16 text-blue-500 mx-auto mb-2" />
        <h1 className="text-4xl font-bold text-gray-800">ドリンクトラッカー</h1>
        <p className="text-gray-600">毎日の水分摂取を記録しましょう</p>
      </header>
      <div className="w-full max-w-md space-y-6">
        <DrinkForm onDrinkAdded={handleDrinkAdded} />
        <Stats />
        <DrinkList />
      </div>
    </div>
  );
}

export default App;
