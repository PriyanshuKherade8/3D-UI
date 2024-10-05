import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Collections/Desktop-View/Main";
import SwipeableEdgeDrawer from "./pages/Collections/Mobile-View/Components/SwipeableEdgeDrawer";
import BottomDrawer from "./components/BottomDrawer";
import MobileMain from "./pages/Collections/Mobile-View/MobileMain";
import RenderView from "./pages/Collections/RenderView";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SwipeableEdgeDrawer />} />
        <Route path="/about" element={<BottomDrawer />} />
        <Route path="/view/:id" element={<RenderView />} />
        <Route path="/desktop/:id" element={<RenderView />} />
        <Route path="/mobile/:id" element={<MobileMain />} />
        <Route path="*" element={<>{"Not Found"}</>} />
      </Routes>
    </Router>
  );
}

export default App;
