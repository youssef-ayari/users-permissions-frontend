import { useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
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
    {
      path: "/users",
      element: (
        <ProtectedRoute>
          <Users />
        </ProtectedRoute>
      ),
    },
  ]);
}
