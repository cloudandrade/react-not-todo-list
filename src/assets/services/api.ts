import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1", // Atualize com o endpoint real.
});

// Authentication
export const login = (email: string, password: string) =>
  api.post("/auth/login", { email, password });

export const register = (email: string, password: string) =>
  api.post("/auth/register", { email, password });

// Tasks
export const getUserTasks = (token: string) =>
  api.get("/todos", { headers: { Authorization: `Bearer ${token}` } });