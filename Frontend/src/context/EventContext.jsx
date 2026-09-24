import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import API from "../services/api";
import { useAuth } from "./AuthContext";

const EventContext = createContext();

export function EventProvider({ children }) {
  const { isAuthenticated, user } = useAuth();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from MongoDB backend
  const fetchEvents = useCallback(async () => {
    if (!isAuthenticated) {
      setEvents([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await API.get("/events");
      if (response.data.success) {
        const normalized = response.data.events.map((event) => ({
          ...event,
          id: event.id || event._id,
        }));
        setEvents(normalized);
      }
    } catch (err) {
      console.error("Failed to fetch events from backend:", err);
      setError(
        err.response?.data?.message || "Failed to load events from server."
      );
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Load events on auth change and cleanup legacy localStorage key
  useEffect(() => {
    fetchEvents();
    localStorage.removeItem("caretaker_events");
  }, [fetchEvents, user?.id]);

  // Add event via backend API
  const addEvent = async (eventData) => {
    try {
      setError(null);
      const response = await API.post("/events", eventData);
      if (response.data.success) {
        const newEvent = {
          ...response.data.event,
          id: response.data.event.id || response.data.event._id,
        };
        setEvents((prev) => [newEvent, ...prev]);
        return newEvent;
      }
    } catch (err) {
      console.error("Error creating event:", err);
      const msg = err.response?.data?.message || "Failed to create event.";
      setError(msg);
      throw err;
    }
  };

  // Update event via backend API
  const updateEvent = async (id, updatedEvent) => {
    try {
      setError(null);
      const response = await API.put(`/events/${id}`, updatedEvent);
      if (response.data.success) {
        const updated = {
          ...response.data.event,
          id: response.data.event.id || response.data.event._id,
        };

        // If date or time changed, clear snooze and prior reminder history
        if (
          updatedEvent.date !== undefined ||
          updatedEvent.time !== undefined
        ) {
          localStorage.removeItem(`snooze_event_${id}`);
          Object.keys(localStorage).forEach((key) => {
            if (key.startsWith(`event_reminded_${id}_`)) {
              localStorage.removeItem(key);
            }
          });
        }

        setEvents((prev) =>
          prev.map((event) =>
            event.id === id || event._id === id ? updated : event
          )
        );
        return updated;
      }
    } catch (err) {
      console.error("Error updating event:", err);
      const msg = err.response?.data?.message || "Failed to update event.";
      setError(msg);
      throw err;
    }
  };

  // Delete event via backend API
  const deleteEvent = async (id) => {
    try {
      setError(null);
      const response = await API.delete(`/events/${id}`);
      if (response.data.success) {
        setEvents((prev) =>
          prev.filter((event) => event.id !== id && event._id !== id)
        );

        // Clear any active snooze or reminder marker for deleted event
        localStorage.removeItem(`snooze_event_${id}`);
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith(`event_reminded_${id}_`)) {
            localStorage.removeItem(key);
          }
        });
      }
    } catch (err) {
      console.error("Error deleting event:", err);
      const msg = err.response?.data?.message || "Failed to delete event.";
      setError(msg);
      throw err;
    }
  };

  return (
    <EventContext.Provider
      value={{
        events,
        loading,
        error,
        fetchEvents,
        addEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

// IMPORTANT: Events.jsx uses this function
export function useEvents() {
  return useContext(EventContext);
}