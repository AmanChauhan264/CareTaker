import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import { EventProvider } from "./context/EventContext";
import ReminderManager from "./components/ReminderManager";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <TaskProvider>
        <EventProvider>
          <ReminderManager />
          <App />
        </EventProvider>
      </TaskProvider>
    </AuthProvider>
  </StrictMode>
);