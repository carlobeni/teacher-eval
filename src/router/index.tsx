
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/authContext";
import { ProtectedRoute } from "./ProtectedRoute";
import Home from "../pages/Home";
import { Login } from "../pages/Login";
import { Register} from "../pages/Login/Register";
import { ResetPassword } from "../pages/Login/ResetPassword";

const Router = () => {
  return (
      <AuthProvider>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        }/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/resetpassword" element={<ResetPassword/>}/>
      </Routes>
    </AuthProvider>
  );
};

export default Router;
