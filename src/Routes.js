import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/App" element={<App />} />
      <Route path="/Map" element={<Map />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}