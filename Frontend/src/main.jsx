import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { TaskProvider } from "./context/TaskContext";
import { EventProvider } from "./context/EventContext";
import ReminderManager from "./components/ReminderManager";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TaskProvider>
      <EventProvider>
        <ReminderManager />
        <App />
      </EventProvider>
    </TaskProvider>
  </StrictMode>
);