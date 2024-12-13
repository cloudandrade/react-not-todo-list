import React, { useState } from "react";
import { login, register } from "../services/api";
import { Button, TextField, Typography, Box, Link } from "@mui/material";

interface AuthFormProps {
  onAuthSuccess: (token: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onAuthSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = isRegister
        ? await register(name, email, password)
        : await login(email, password);

      if (isRegister && response.status === 201) {
        alert("User registered successfully!");
        setIsRegister(false);
      } else {
        const token = response.data.token;
        onAuthSuccess(token);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 2, p: 2 }}>
      <Box sx={{ backgroundColor: "yellow" }}>
        <Typography variant="h3" textAlign="center" gutterBottom sx={{ mb: 2 }}>
          TO DO, BUT NO
        </Typography>
        <Typography variant="h6" textAlign="center" gutterBottom sx={{ mb: 6 }}>
          Task list that only YOU want to see
        </Typography>
      </Box>

      <Typography variant="h4" textAlign="center" gutterBottom>
        {isRegister ? "Register" : "Login"}
      </Typography>
      {error && (
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        {isRegister ? (
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <></>
        )}
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          {isRegister ? "Register" : "Login"}
        </Button>
      </form>
      <Typography textAlign="center" sx={{ mt: 2 }}>
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <Link
          onClick={() => setIsRegister(!isRegister)}
          sx={{ cursor: "pointer" }}
        >
          {isRegister ? "Login" : "Register"}
        </Link>
      </Typography>
    </Box>
  );
};

export default AuthForm;
