import { useEffect } from "react";
import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const fetchUser = useAuth((s) => s.fetchUser);
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleLogout = async () => {
    const res = await logout();
    if (res) {
      navigate("/login");
    } else {
      console.log(res);
    }
  };
  return (
    <div>
      {`Welcome ${user?.email}`}
      <br/>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
