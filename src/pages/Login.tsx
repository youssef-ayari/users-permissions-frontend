import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    globalThis.location.href = "/dashboard";
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <form onSubmit={submit} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 w-full">
          Login
        </button>
      </form>
    </div>
  );
}
