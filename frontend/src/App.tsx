import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
