import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ListABook from "./pages/ListABook";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ListABook" element={<ListABook />} />
      </Routes>
    </Router>
  );
}

export default App;
