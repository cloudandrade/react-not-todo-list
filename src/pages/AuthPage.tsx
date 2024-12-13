import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const AuthPage: React.FC = () => {
  const [token, setToken] = useState<string>("");
  const navigate = useNavigate();

  const handleAuthSuccess = (receivedToken: string) => {
    setToken(receivedToken);
    localStorage.setItem("token", receivedToken);
    navigate("/home");
  };

  return <AuthForm onAuthSuccess={handleAuthSuccess} />;
};

export default AuthPage;
