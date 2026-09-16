import { createContext, useContext, useEffect, useState } from "react";

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("caretaker_events");

    if (savedEvents) {
      return JSON.parse(savedEvents);
    }

    return [
      {
        id: 1,
        title: "Temple Visit",
        date: "2026-09-20",
        time: "10:00",
        description: "Visit temple with family",
      },
      {
        id: 2,
        title: "Project Submission",
        date: "2026-09-25",
        time: "17:00",
        description: "Submit CARETAKER project",
      },
    ];
  });

  // Save events whenever they change
  useEffect(() => {
    localStorage.setItem(
      "caretaker_events",
      JSON.stringify(events)
    );
  }, [events]);

  // Add event
  const addEvent = (event) => {
    setEvents((prev) => [
      ...prev,
      {
        ...event,
        id: Date.now(),
      },
    ]);
  };

  // Delete event
  const deleteEvent = (id) => {
    setEvents((prev) =>
      prev.filter((event) => event.id !== id)
    );
  };

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventContext);
}