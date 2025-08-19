import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/user/home";
import { AdminRoute } from "./routers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/*" element={<AdminRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
