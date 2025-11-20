import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Users", path: "/users" },
    { name: "Roles", path: "/roles" },
    { name: "Permissions", path: "/permissions" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-800 text-white p-4 flex flex-col">
        <div className="mb-6">
          <h2 className="text-xl font-bold">App Dashboard</h2>
          {user && (
            <div className="mt-2 text-sm">
              <p>{user.email}</p>
              <p className="text-gray-300">{user.role}</p>
            </div>
          )}
        </div>

        <nav className="flex-1 space-y-2">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-3 py-2 rounded hover:bg-gray-700 ${
                location.pathname === link.path ? "bg-gray-700" : ""
              }`}>
              {link.name}
            </Link>
          ))}
        </nav>

        <button
          onClick={logout}
          className="mt-auto bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user?.email}</h1>
        <p>Select a page from the sidebar.</p>
      </main>
    </div>
  );
}
