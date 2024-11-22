import { useState, useEffect } from "react";
import "./App.css";

// Component
import Loading from "./Components/Loading/Loading";
import Header from "./Components/Header/Header";
// import Form from "./Components/Form/Form";

import Form from "./Components/Form/Form";

// Hooks
import { ThemeProvider } from './Components/Hook/ThemeContext'; // Adjust path as needed

export default function App() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => setLoading(false), 3300);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen bgColor">
        <Loading width="150" height="150" />
      </div>
    );
  }
  else {
    return (
      <ThemeProvider>
        <div className="w-screen h-screen overflow-hidden">
          <Header />
          <div className="absolute bottom-0 flex justify-center items-center w-full h-[calc(100vh-80px)]">
            <Form />
          </div>
        </div>
      </ThemeProvider>
    );
  }  
}