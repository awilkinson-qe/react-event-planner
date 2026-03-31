// Handles event state (add, edit, delete) and shares it across the app
import { useEffect, useState } from "react";
import { EventContext } from "./EventContextValue";

export function EventProvider({ children }) {
  // Load saved events from localStorage
  const [events, setEvents] = useState(() => {
    try {
      const savedEvents = localStorage.getItem("events");
      return savedEvents ? JSON.parse(savedEvents) : [];
    } catch {
      return [];
    }
  });

  // Save events whenever they change
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  // Add a new event
  function addEvent(newEvent) {
    setEvents((prevEvents) => [
      ...prevEvents,
      {
        ...newEvent,
        id: Date.now(),
        category: newEvent.category || "Meeting",
      },
    ]);
  }

  // Delete an event
  function deleteEvent(id) {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== id)
    );
  }

  // Update an existing event
  function updateEvent(updatedEvent) {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id
          ? {
              ...updatedEvent,
              category: updatedEvent.category || "Meeting",
            }
          : event
      )
    );
  }

  // Share event data and actions across the app
  return (
    <EventContext.Provider value={{ events, addEvent, deleteEvent, updateEvent }}>
      {children}
    </EventContext.Provider>
  );
}