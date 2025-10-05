import React, { useState } from "react";
import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });

  const login = useAuth((s) => s.login);
  const message = useAuth((s) => s.message);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login(user.email, user.password);
    if (res) {
      navigate("/");
      console.log(message);
    } else {
      console.log(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="card p-6 w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          className="input input-bordered w-full mb-2"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          className="input input-bordered w-full mb-4"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button className="btn btn-primary w-full">Login</button>
      </form>
    </div>
  );
}
