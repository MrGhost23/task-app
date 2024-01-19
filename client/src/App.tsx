import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TaskDetail from "./pages/TaskDetail";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "./store/slices/userAuthSlice";
import axios from "axios";

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
        dispatch(setUser(response.data.userData));
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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route path="/tasks/:id" element={<TaskDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
