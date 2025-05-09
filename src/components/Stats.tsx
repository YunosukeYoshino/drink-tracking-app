import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Drink } from '../types';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Stats: React.FC = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [goal, setGoal] = useState(2000); // Default goal of 2000ml
  const [loading, setLoading] = useState(true);
  const [typeData, setTypeData] = useState<{ labels: string[], data: number[] }>({ labels: [], data: [] });
  const [timeData, setTimeData] = useState<{ labels: string[], data: number[] }>({ labels: [], data: [] });

  useEffect(() => {
    fetchStats();
  }, []);
  
  useEffect(() => {
    const fetchUserGoal = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data, error } = await supabase
          .from('user_settings')
          .select('goal')
          .eq('user_id', session.user.id)
          .single();
        if (error) {
          console.error('Error fetching user goal:', error);
          return;
        }
        if (data) {
          setGoal(data.goal || 2000);
        }
      }
    };
    fetchUserGoal();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('drinks').select('amount, type, created_at');
      if (error) throw error;
      
      const total = data?.reduce((sum, drink: Drink) => sum + drink.amount, 0) || 0;
      setTotalAmount(total);
      
      // 種類別データの集計
      const typeMap = new Map<string, number>();
      data?.forEach((drink: Drink) => {
        const currentAmount = typeMap.get(drink.type) || 0;
        typeMap.set(drink.type, currentAmount + drink.amount);
      });
      const typeLabels = Array.from(typeMap.keys());
      const typeAmounts = Array.from(typeMap.values());
      setTypeData({ labels: typeLabels, data: typeAmounts });
      
      // 時間帯別データの集計（1日を4つの時間帯に分割）
      const timeMap = new Map<string, number>([
        ['深夜 (0-6時)', 0],
        ['朝 (6-12時)', 0],
        ['午後 (12-18時)', 0],
        ['夜 (18-24時)', 0]
      ]);
      data?.forEach((drink: Drink) => {
        const hour = new Date(drink.created_at).getHours();
        if (hour >= 0 && hour < 6) timeMap.set('深夜 (0-6時)', timeMap.get('深夜 (0-6時)')! + drink.amount);
        else if (hour >= 6 && hour < 12) timeMap.set('朝 (6-12時)', timeMap.get('朝 (6-12時)')! + drink.amount);
        else if (hour >= 12 && hour < 18) timeMap.set('午後 (12-18時)', timeMap.get('午後 (12-18時)')! + drink.amount);
        else timeMap.set('夜 (18-24時)', timeMap.get('夜 (18-24時)')! + drink.amount);
      });
      const timeLabels = Array.from(timeMap.keys());
      const timeAmounts = Array.from(timeMap.values());
      setTimeData({ labels: timeLabels, data: timeAmounts });
    } catch (error) {
      console.error('統計取得エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">統計を読み込み中...</div>;

  const progress = Math.min((totalAmount / goal) * 100, 100).toFixed(1);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">統計ダッシュボード</h2>
      <p className="text-lg mb-2">総ドリンク摂取量: <span className="font-semibold">{totalAmount} ml</span> / 目標: <span className="font-semibold">{goal} ml</span></p>
      <div className="w-full bg-gray-200 rounded-full h-8 relative mb-6">
        <div
          className="bg-blue-600 h-8 rounded-full flex items-center justify-center text-white font-semibold"
          style={{ width: `${progress}%` }}
          aria-label={`Goal progress: ${progress}%`}
        >
          {progress}%
        </div>
        {parseFloat(progress) >= 80 && (
          <span className="absolute top-0 right-0 bg-green-500 text-white rounded-full px-2 py-1 text-xs mt-(-2) mr-(-2)">
            Great Job!
          </span>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-6">達成率: {progress}%</p>
      
      <h3 className="text-xl font-semibold mb-2">種類別摂取量</h3>
      <div className="mb-6" style={{ height: '300px' }}>
        <Bar
          data={{
            labels: typeData.labels.map(label => label === 'Water' ? '水' : label === 'Coffee' ? 'コーヒー' : label === 'Tea' ? 'お茶' : label === 'Soda' ? 'ソーダ' : 'ジュース'),
            datasets: [{
              label: '摂取量 (ml)',
              data: typeData.data,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true }
            }
          }}
        />
      </div>
      
      <h3 className="text-xl font-semibold mb-2">時間帯別摂取量</h3>
      <div style={{ height: '300px' }}>
        <Bar
          data={{
            labels: timeData.labels,
            datasets: [{
              label: '摂取量 (ml)',
              data: timeData.data,
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true }
            }
          }}
        />
      </div>
    </div>
  );
};

export default Stats;
