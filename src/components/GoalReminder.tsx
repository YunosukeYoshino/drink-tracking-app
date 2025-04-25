import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

function GoalReminder() {
  const [goal, setGoal] = useState<number>(2000); // Default goal of 2000ml
  const [reminderInterval, setReminderInterval] = useState<number>(60); // Default reminder every 60 minutes
  const [isReminderActive, setIsReminderActive] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserSettings = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data, error } = await supabase
          .from('user_settings')
          .select('goal, reminder_interval, reminder_active')
          .eq('user_id', session.user.id)
          .single();
        if (error) {
          console.error('Error fetching user settings:', error);
          alert('ユーザー設定の取得に失敗しました。もう一度お試しください。');
          return;
        }
        if (data) {
          setGoal(data.goal || 2000);
          setReminderInterval(data.reminder_interval || 60);
          setIsReminderActive(data.reminder_active || false);
          if (data.reminder_active) {
            scheduleReminder();
          }
        }
      }
    };
    fetchUserSettings();

    // Check localStorage for reminder settings on app load
    const reminderActive = localStorage.getItem('reminderActive');
    const reminderIntervalStored = localStorage.getItem('reminderInterval');
    if (reminderActive === 'true' && reminderIntervalStored) {
      setReminderInterval(Number(reminderIntervalStored));
      setIsReminderActive(true);
      scheduleReminder();
    }
  }, []);

  const saveSettings = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: session.user.id,
          goal,
          reminder_interval: reminderInterval,
          reminder_active: isReminderActive
        });
      if (error) {
        console.error('Error saving user settings:', error);
        alert('設定の保存に失敗しました。もう一度お試しください。');
      } else {
        alert('設定が保存されました');
        if (isReminderActive) {
          scheduleReminder();
        } else {
          clearReminder();
        }
      }
    }
  };

  const toggleReminder = () => {
    setIsReminderActive(!isReminderActive);
  };

  const scheduleReminder = () => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        setReminder();
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            setReminder();
          }
        });
      }
    }
  };

  const setReminder = () => {
    const intervalMs = reminderInterval * 60 * 1000;
    const intervalId = setInterval(() => {
      new Notification('ドリンクトラッカーリマインダー', {
        body: '水分を摂取する時間です！',
      });
    }, intervalMs);
    localStorage.setItem('reminderIntervalId', intervalId.toString());
    localStorage.setItem('reminderActive', 'true');
    localStorage.setItem('reminderInterval', reminderInterval.toString());
  };

  const clearReminder = () => {
    const intervalId = localStorage.getItem('reminderIntervalId');
    if (intervalId) {
      clearInterval(parseInt(intervalId, 10));
      localStorage.removeItem('reminderIntervalId');
      localStorage.setItem('reminderActive', 'false');
    }
  };

  useEffect(() => {
    return () => {
      clearReminder();
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">目標とリマインダー</h2>
      <div className="mb-3">
        <label htmlFor="goal" className="block text-sm font-medium text-gray-700">1日の摂取目標 (ml):</label>
        <input
          type="number"
          id="goal"
          value={goal}
          onChange={(e) => setGoal(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          min="0"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="reminderInterval" className="block text-sm font-medium text-gray-700">リマインダー間隔 (分):</label>
        <input
          type="number"
          id="reminderInterval"
          value={reminderInterval}
          onChange={(e) => setReminderInterval(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          min="1"
        />
      </div>
      <div className="flex items-center mb-3">
        <input
          type="checkbox"
          id="reminderToggle"
          checked={isReminderActive}
          onChange={toggleReminder}
          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="reminderToggle" className="ml-2 block text-sm font-medium text-gray-700">リマインダーを有効にする</label>
      </div>
      <button
        onClick={saveSettings}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        設定を保存
      </button>
    </div>
  );
}

export default GoalReminder;