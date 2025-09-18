import React, { useState } from "react";

// Import your Arabic screens
import ArabicMainPage from "./app/ArabicPages/ArabicMainPage";
import ArabicAlphabetsScreen from "./app/ArabicPages/ArabicAlphabetsScreen";

export default function App() {
  const [screen, setScreen] = useState("ArabicModule");
  const [params, setParams] = useState({});

  // Helper function to navigate
  const navigate = (nextScreen, nextParams = {}) => {
    setScreen(nextScreen);
    setParams(nextParams);
  };

  // Arabic module navigation
  if (screen === "ArabicModule") {
    return <ArabicMainPage onNext={(p) => navigate(p.screen)} />;
  }

  if (screen === "ArabicAlphabetsScreen") {
    return <ArabicAlphabetsScreen onBack={() => navigate("ArabicModule")} />;
  }

  return null;
}