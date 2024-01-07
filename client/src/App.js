import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login.jsx";
import Register from "./pages/login/register.jsx";
import PersistLogin from "./components/auth/persistlogin.jsx";
import Home from "./pages/home/home.jsx";
import NotAuth from "./components/auth/notauth.jsx";
import Reset from "./pages/reset/index.jsx";
import Profile from "./pages/profile/index.jsx";

function App() {
  return (
    <Routes>
      <Route element={<NotAuth />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
      </Route>
      <Route element={<PersistLogin />}>
        <Route path="/activate/:token" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile/:userName" element={<Profile/>} />
      </Route>
    </Routes>
  );
}

export default App;
