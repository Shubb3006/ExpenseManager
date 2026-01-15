import { useEffect } from "react";
import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Expenses from "./pages/Expenses";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import AddExpense from "./pages/AddExpense";
import { useAuthStore } from "./store/useAuthStore";
import AuthSkeleton from "./components/skeletons/AuthSkeletons";

function App() {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);
  if (isCheckingAuth) return <AuthSkeleton />;
  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/expenses"
          element={authUser ? <Expenses /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/addexpense"
          element={authUser ? <AddExpense /> : <Navigate to="/login " />}
        />
      </Routes>
    </>
  );
}

export default App;
