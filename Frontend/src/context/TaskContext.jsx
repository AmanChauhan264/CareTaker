import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const today = new Date().toISOString().split("T")[0];

  // Load tasks from localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("caretaker_tasks");

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return [
      {
        id: 1,
        title: "Complete DSA Practice",
        date: today,
        time: "19:00",
        completed: false,
      },
      {
        id: 2,
        title: "Work on CARETAKER",
        date: today,
        time: "20:00",
        completed: false,
      },
      {
        id: 3,
        title: "Attend College",
        date: today,
        time: "10:00",
        completed: true,
      },
    ];
  });

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem(
      "caretaker_tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  // Add task
  const addTask = (task) => {
    setTasks((prev) => [
      ...prev,
      {
        ...task,
        id: Date.now(),
        completed: false,
      },
    ]);
  };

  // Update task
  const updateTask = (id, updatedTask) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              ...updatedTask,
            }
          : task
      )
    );
  };

  // Complete / uncomplete task
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
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