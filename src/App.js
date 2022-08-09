import Home from "./pages/Home";
import ChainInfo from "./pages/ChainInfo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import FakeBayc from "./pages/FakeBayc";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="chainInfo" element={<ChainInfo />} />
        <Route path="fakeBayc" element={<FakeBayc />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
