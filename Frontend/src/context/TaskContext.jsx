import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import API from "../services/api";
import { useAuth } from "./AuthContext";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const { isAuthenticated, user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks from MongoDB backend
  const fetchTasks = useCallback(async () => {
    if (!isAuthenticated) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await API.get("/tasks");
      if (response.data.success) {
        const normalized = response.data.tasks.map((task) => ({
          ...task,
          id: task.id || task._id,
        }));
        setTasks(normalized);
      }
    } catch (err) {
      console.error("Failed to fetch tasks from backend:", err);
      setError(
        err.response?.data?.message || "Failed to load tasks from server."
      );
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Load tasks on auth change and cleanup legacy localStorage key
  useEffect(() => {
    fetchTasks();
    localStorage.removeItem("caretaker_tasks");
  }, [fetchTasks, user?.id]);

  // Add task via backend API
  const addTask = async (taskData) => {
    try {
      setError(null);
      const response = await API.post("/tasks", taskData);
      if (response.data.success) {
        const newTask = {
          ...response.data.task,
          id: response.data.task.id || response.data.task._id,
        };
        setTasks((prev) => [newTask, ...prev]);
        return newTask;
      }
    } catch (err) {
      console.error("Error creating task:", err);
      const msg = err.response?.data?.message || "Failed to create task.";
      setError(msg);
      throw err;
    }
  };

  // Update task via backend API
  const updateTask = async (id, updatedTask) => {
    try {
      setError(null);
      const response = await API.put(`/tasks/${id}`, updatedTask);
      if (response.data.success) {
        const updated = {
          ...response.data.task,
          id: response.data.task.id || response.data.task._id,
        };

        // If date or time changed, clear snooze and prior reminder history
        if (
          updatedTask.date !== undefined ||
          updatedTask.time !== undefined
        ) {
          localStorage.removeItem(`snooze_task_${id}`);
          Object.keys(localStorage).forEach((key) => {
            if (key.startsWith(`task_reminded_${id}_`)) {
              localStorage.removeItem(key);
            }
          });
        }

        setTasks((prev) =>
          prev.map((task) =>
            task.id === id || task._id === id ? updated : task
          )
        );
        return updated;
      }
    } catch (err) {
      console.error("Error updating task:", err);
      const msg = err.response?.data?.message || "Failed to update task.";
      setError(msg);
      throw err;
    }
  };

  // Toggle task completion via backend API
  const toggleTask = async (id) => {
    try {
      setError(null);
      const response = await API.patch(`/tasks/${id}/toggle`);
      if (response.data.success) {
        const updated = {
          ...response.data.task,
          id: response.data.task.id || response.data.task._id,
        };

        setTasks((prev) =>
          prev.map((task) =>
            task.id === id || task._id === id ? updated : task
          )
        );
        return updated;
      }
    } catch (err) {
      console.error("Error toggling task completion:", err);
      const msg = err.response?.data?.message || "Failed to toggle task.";
      setError(msg);
      throw err;
    }
  };

  // Delete task via backend API
  const deleteTask = async (id) => {
    try {
      setError(null);
      const response = await API.delete(`/tasks/${id}`);
      if (response.data.success) {
        setTasks((prev) =>
          prev.filter((task) => task.id !== id && task._id !== id)
        );

        // Clear any active snooze or reminder marker for deleted task
        localStorage.removeItem(`snooze_task_${id}`);
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith(`task_reminded_${id}_`)) {
            localStorage.removeItem(key);
          }
        });
      }
    } catch (err) {
      console.error("Error deleting task:", err);
      const msg = err.response?.data?.message || "Failed to delete task.";
      setError(msg);
      throw err;
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks,
        addTask,
        updateTask,
        toggleTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}