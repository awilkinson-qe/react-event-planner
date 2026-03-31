// Page for creating a new event
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EventContext } from "../context/EventContextValue";
import { UserContext } from "../context/UserContextValue";
import EventForm from "../components/EventForm";

export default function AddEvent() {
  // Get event actions and current user
  const { addEvent } = useContext(EventContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Add event and return to dashboard
  function handleAddEvent(newEvent) {
    addEvent({
      ...newEvent,
      username: user.username,
    });

    navigate("/");
  }

  return (
    <div className="content-page">
      <div className="content-shell">
        <div className="content-panel content-panel-medium">
          <div className="page-header">
            <p className="page-kicker">Timeline</p>
            <h1 className="page-title">Add event</h1>
            <p className="page-text">
              Create a new event and add it to your dashboard.
            </p>
          </div>

          <EventForm onSubmit={handleAddEvent} buttonText="Add Event" />
        </div>
      </div>
    </div>
  );
}