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
    <div className="w-full max-w-xs space-y-6 sm:max-w-md md:max-w-lg">
      <DrinkForm onDrinkAdded={onDrinkAdded} />
      <DrinkList />
    </div>
  );
}

export default HomePage;
