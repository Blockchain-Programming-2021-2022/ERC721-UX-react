import Home from "./pages/Home";
import ChainInfo from "./pages/ChainInfo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import FakeBayc from "./pages/FakeBayc";
import FakeBaycDisplay from "./components/FakeBaycDisplay";
import { BlockchainProvider } from "./BlockchainContext";
import FakeNeftrurians from "./pages/FakeNeftrurians";
import FakeNefturiansDisplay from "./components/FakeNefturiansDisplay";
import FakeMeebits from "./pages/FakeMeebits";

const App = () => {
  return (
    <BlockchainProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="chainInfo" element={<ChainInfo />} />
          <Route path="fakeBayc" element={<FakeBayc />}>
            <Route path=":nftId" element={<FakeBaycDisplay />} />
          </Route>
          <Route path="/fakeNefturians" element={<FakeNeftrurians />}>
            <Route path=":userAddress" element={<FakeNefturiansDisplay />} />
          </Route>
          <Route path="/fakeMeebits" element={<FakeMeebits />} />
        </Routes>
      </BrowserRouter>
    </BlockchainProvider>
  );
};

export default App;
