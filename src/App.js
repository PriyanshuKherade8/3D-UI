import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ExampleComponent from "./components/ExampleComponent";
import Main from "./pages/Collections/Desktop-View/Main";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<ExampleComponent />} />
        <Route path="*" element={<>{"Not Found"}</>} />
      </Routes>
    </Router>
  );
}

export default App;
