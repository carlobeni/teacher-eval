import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/authContext";
import { ProtectedRoute } from "./ProtectedRoute";
import Home from "../pages/Home";
import { Login } from "../pages/Login";

const Router = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
};

export default Router;
