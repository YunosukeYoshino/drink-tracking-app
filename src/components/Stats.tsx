import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Drink } from '../types';

const Stats: React.FC = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('drinks').select('amount');
      if (error) throw error;
      const total = data?.reduce((sum, drink: Drink) => sum + drink.amount, 0) || 0;
      setTotalAmount(total);
    } catch (error) {
      console.error('統計取得エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">統計を読み込み中...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">統計</h2>
      <p className="text-lg">総ドリンク摂取量: <span className="font-semibold">{totalAmount} ml</span></p>
    </div>
  );
};

export default Stats;
