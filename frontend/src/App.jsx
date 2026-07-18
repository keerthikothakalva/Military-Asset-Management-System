import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Bases from "./pages/Bases";
import Equipment from "./pages/Equipment";
import Purchases from "./pages/Purchases";
import Transfers from "./pages/Transfers";
import Assignments from "./pages/Assignments";
import Expenditures from "./pages/Expenditures";
import NotFound from "./pages/NotFound";

import MainLayout from "./layouts/MainLayout";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bases" element={<Bases />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/transfers" element={<Transfers />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/expenditures" element={<Expenditures />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;