import { Routes, Route } from "react-router-dom";
import Login from "../Components/Login";
import SignUpForm from "../Components/SignUpForm";
import UserDashboard from "../Components/UserDashboard";
import AdminDashboard from "../Components/AdminDashboard";
import TechSupportDashboard from "../Components/TechSupportDashboard";

const ForntPage = () => {
  //   const [authenticated, setAuthenticated] = useState(false);

  const handleSignup = () => {
    // setAuthenticated(true);
  };

  return (
    <Routes>
      <Route
        path="/signup"
        element={<SignUpForm handleSignup={handleSignup} />}
      />
      <Route path="/" element={<Login />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route
        path="/tech-support-dashboard"
        element={<TechSupportDashboard />}
      />
    </Routes>
  );
};

export default ForntPage;
