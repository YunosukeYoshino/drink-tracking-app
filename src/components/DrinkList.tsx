import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Drink } from '../types';
import { Trash2 } from 'lucide-react';

const DrinkList: React.FC = () => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrinks();
    const subscription = supabase
      .channel('drinks')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'drinks' }, () => {
        fetchDrinks();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchDrinks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('drinks')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setDrinks(data || []);
    } catch (error) {
      console.error('ドリンク取得エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('このドリンクを削除してもよろしいですか？')) {
      try {
        const { error } = await supabase.from('drinks').delete().eq('id', id);
        if (error) throw error;
        fetchDrinks();
      } catch (error) {
        console.error('ドリンク削除エラー:', error);
        alert('ドリンクの削除に失敗しました');
      }
    }
  };

  if (loading) return <div className="text-center py-10">読み込み中...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">ドリンク履歴</h2>
      {drinks.length === 0 ? (
        <p className="text-gray-500">まだドリンクが記録されていません。</p>
      ) : (
        <ul className="space-y-2">
          {drinks.map((drink) => (
            <li key={drink.id} className="border-b pb-2 flex justify-between items-center">
              <div>
                <p className="font-medium">{drink.type === 'Water' ? '水' : drink.type === 'Coffee' ? 'コーヒー' : drink.type === 'Tea' ? 'お茶' : drink.type === 'Soda' ? 'ソーダ' : 'ジュース'}</p>
                <p className="text-sm text-gray-600">{drink.amount} ml</p>
                <p className="text-xs text-gray-400">{new Date(drink.created_at).toLocaleString('ja-JP')}</p>
              </div>
              <button
                onClick={() => handleDelete(drink.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DrinkList;
