import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const login = (email: string, password: string) =>
  api.post("/auth", { email, password });

export const register = (name:string, email: string, password: string) =>
  api.post("/users", { name, email, password });

export const getUserTasks = (token: string) =>
  api.get("/tasks", { headers: { Authorization: `Bearer ${token}` } });

// Adicionar uma nova tarefa
export const addTask = async (
  token: string,
  task: { title: string; subtitle?: string }
): Promise<AxiosResponse<Promise<any>, any>> => {
  try {
    const response = await api.post(
      `/tasks`,
      task,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Failed to add task", error);
    throw error;
  }
};


// Editar uma tarefa existente
export const editTask = async (
  token: string,
  taskId: string,
  updatedTask: { title?: string; subtitle?: string; }
) => {
  try {
    const response = await api.put(
      `/tasks/${taskId}`,
      updatedTask,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to edit task", error);
    throw error;
  }
};

// Excluir uma tarefa
export const deleteTask = async (token: string, taskId: string) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to delete task", error);
    throw error;
  }
};
