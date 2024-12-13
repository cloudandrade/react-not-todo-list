import React, { useState, useEffect } from "react";
import { getUserTasks, addTask, editTask, deleteTask } from "../services/api";
import {
  Box,
  Typography,
  CircularProgress,
  Fab,
  Button,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import { useNavigate } from "react-router-dom";

type Task = {
  id?: string;
  title: string;
  subtitle: string;
};

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await getUserTasks(token);
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAddTask = async (data: { title: string; subtitle: string }) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      await addTask(token, data).then((res) => {
        console.log("status: " + JSON.stringify(res.status));
        if (res.status === 201) {
          fetchTasks();
        }
      });
    } catch (error) {
      console.error("Failed to add task", error);
    }
  };

  const handleEditTask = async (data: { title: string; subtitle: string }) => {
    if (!currentTask) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      await editTask(token, currentTask.id!, data);
      setTasks((prev) =>
        prev.map((task) =>
          task.id === currentTask.id ? { ...task, ...data } : task
        )
      );
    } catch (error) {
      console.error("Failed to edit task", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      await deleteTask(token, id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const openAddModal = () => {
    setCurrentTask(null);
    setModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setCurrentTask(task);
    setModalOpen(true);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Typography variant="h4" textAlign="center" gutterBottom sx={{ mt: 2 }}>
        Your Tasks
      </Typography>
      <Box sx={{ margin: 1 }}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            description={task.subtitle}
            onEdit={() => openEditModal(task)}
            onDelete={() => handleDeleteTask(task.id!)}
          />
        ))}
      </Box>
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={openAddModal}
      >
        <AddIcon />
      </Fab>
      <TaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={(data) =>
          currentTask
            ? handleEditTask({ title: data.title, subtitle: data.description })
            : handleAddTask({ title: data.title, subtitle: data.description })
        }
        initialData={
          currentTask
            ? { title: currentTask.title, description: currentTask.subtitle }
            : undefined
        }
      />
    </Box>
  );
};

export default HomePage;
