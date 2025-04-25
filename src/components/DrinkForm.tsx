import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface DrinkFormProps {
  onDrinkAdded: () => void;
}

const DrinkForm: React.FC<DrinkFormProps> = ({ onDrinkAdded }) => {
  const [type, setType] = useState('Water');
  const [amount, setAmount] = useState(250);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('drinks').insert([{ type, amount }]);
      if (error) throw error;
      onDrinkAdded();
      setType('Water');
      setAmount(250);
    } catch (error) {
      console.error('ドリンク追加エラー:', error);
      alert('ドリンクの追加に失敗しました');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">ドリンクを追加</h2>
      <div className="mb-4">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">ドリンクの種類</label>
        <div className="relative">
    <select
        id="type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    >
        <option value="Water">水</option>
        <option value="Coffee">コーヒー</option>
        <option value="Tea">お茶</option>
        <option value="Soda">ソーダ</option>
        <option value="Juice">ジュース</option>
        <option value="Custom">カスタム</option>
    </select>
    {type === 'Custom' && (
        <input
            type="text"
            placeholder="カスタムドリンク名を入力"
            onChange={(e) => setType(e.target.value)}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
    )}
</div>
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">量 (ml)</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          min="1"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        追加する
      </button>
    </form>
  );
};

export default DrinkForm;
