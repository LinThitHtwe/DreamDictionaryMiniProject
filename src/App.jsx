import Navbar from "./components/Navbar";
import supabase from "./config/SupabaseClient";
import DreamDetail from "./pages/DreamDetail";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<DreamDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
