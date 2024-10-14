import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Collections/Desktop-View/Main";
import SwipeableEdgeDrawer from "./pages/Collections/Mobile-View/Components/SwipeableEdgeDrawer";
import BottomDrawer from "./components/BottomDrawer";
import MobileMain from "./pages/Collections/Mobile-View/MobileMain";
import RenderView from "./pages/Collections/RenderView";
import StoryMain from "./pages/Story/Mobile-View/StoryMain";
import Chapters from "./pages/Story/Mobile-View/Components/Chapters";
import RenderStory from "./pages/Story/RenderStory";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SwipeableEdgeDrawer />} />
        <Route path="/about" element={<BottomDrawer />} />
        <Route path="/view/:id" element={<RenderView />} />
        <Route path="/desktop/:id" element={<RenderView />} />
        <Route path="/story" element={<RenderStory />} />
        <Route path="/chapter" element={<Chapters />} />
        <Route path="*" element={<>{"Not Found"}</>} />
      </Routes>
    </Router>
  );
}

export default App;
