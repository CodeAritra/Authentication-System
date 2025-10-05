import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { useEffect, type JSX } from "react";
import { useAuth } from "./store/authStore";

interface Props {
  children: JSX.Element;
}

function ProtectedRoute({ children }: Props) {
  const { user, loading, fetchUser } = useAuth();

  useEffect(() => {
    if (loading) fetchUser();
  }, [loading, fetchUser]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  if (!user) return <Navigate to="/login" replace />;

  return children;
}

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
