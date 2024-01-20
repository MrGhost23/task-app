import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "./store/slices/userAuthSlice";
import axios from "axios";
import TasksPage from "./pages/TasksPage";
import Profile from "./pages/Profile";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const localToken = localStorage.getItem("token");

  useEffect(() => {
    if (!localToken) {
      setIsLoading(false);
      return;
    }
    const fetchToken = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/validateToken",
          {
            token: localToken,
          }
        );
        if (response.data.error) {
          setIsLoading(false);
          return;
        }
        if (response.data.isValid) {
          dispatch(setUser(response.data.payload));
        }
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchToken();
  }, [dispatch, localToken]);

  if (isLoading) return;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <TasksPage /> : <Login />} />
        <Route path="/profile" element={user ? <Profile /> : <Login />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
    </Router>
  );
};

export default App;
