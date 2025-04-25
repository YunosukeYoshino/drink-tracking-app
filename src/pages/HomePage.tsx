import React from "react";
import DrinkForm from "../components/DrinkForm";
import DrinkList from "../components/DrinkList";
import { useOutletContext } from "react-router-dom";

// Context から onDrinkAdded 関数を受け取る
interface ContextType {
  onDrinkAdded: () => void;
}

function HomePage() {
  const { onDrinkAdded } = useOutletContext<ContextType>();
  return (
    <div className="w-full max-w-md p-4 space-y-6 md:max-w-lg bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800">Drink Tracker</h2>
      <div className="space-y-4">
        <DrinkForm onDrinkAdded={onDrinkAdded} />
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div className="bg-blue-500 h-4 rounded-full" style={{ width: '50%' }} aria-label="Goal progress: 50%"></div>
        </div>
        <DrinkList />
      </div>
    </div>
  );
}

export default HomePage;
