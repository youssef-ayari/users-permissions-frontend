import { useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRouter() {
  return useRoutes([
    { path: "/login", element: <Login /> },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
  ]);
}
