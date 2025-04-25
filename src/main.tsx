import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import HomePage from "./pages/HomePage.tsx"; // Import HomePage
import ReminderPage from "./pages/ReminderPage.tsx"; // Import ReminderPage
import StatsPage from "./pages/StatsPage.tsx"; // Import StatsPage
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App is now the layout component
    children: [
      {
        index: true, // Default child route for "/"
        element: <HomePage />,
      },
      {
        path: "reminder", // Route for "/reminder"
        element: <ReminderPage />,
      },
      {
        path: "stats", // Route for "/stats"
        element: <StatsPage />,
      },
    ],
  },
  // Removed future flags as they cause TS errors in v7.5.2
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
