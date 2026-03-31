// Shows the logged-in user's upcoming events
import { useContext } from "react";
import { EventContext } from "../context/EventContextValue";
import { UserContext } from "../context/UserContextValue";
import EventCard from "../components/EventCard";

export default function Dashboard() {
  // Get event data and the current user
  const { events, deleteEvent, updateEvent } = useContext(EventContext);
  const { user } = useContext(UserContext);

  // Only show events that belong to the logged-in user
  const userEvents = user
    ? events.filter((event) => event.username === user.username)
    : [];

  // Sort events so the next one appears first
  const sortedEvents = [...userEvents].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA - dateB;
  });

  return (
    <div className="content-page">
      <div className="content-shell">
        <div className="page-header dashboard-header dashboard-header-row">
          <div>
            <p className="page-kicker">Timeline</p>
            <h2 className="page-title dashboard-title">Upcoming Events</h2>
            <p className="page-text">
              View, update, and manage your upcoming schedule.
            </p>
          </div>

          <div className="dashboard-summary-card">
            <span className="dashboard-summary-label">Total events</span>
            <span className="dashboard-summary-number">{sortedEvents.length}</span>
          </div>
        </div>

        {sortedEvents.length === 0 ? (
          <div className="content-panel empty-state">
            <p>No events yet. Click "Add Event" to create your first one.</p>
          </div>
        ) : (
          <div className="events-grid">
            {sortedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                deleteEvent={deleteEvent}
                updateEvent={updateEvent}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}