// Displays one event card with options to view, edit, or delete
import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import EventForm from "./EventForm";

export default function EventCard({ event, deleteEvent, updateEvent }) {
  // Track edit mode and extra details
  const [isEditing, setIsEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Save updates and return to normal card view
  function handleEditSubmit(updatedEvent) {
    updateEvent(updatedEvent);
    setIsEditing(false);
  }

  // Build date labels for the badge shown on the image
  const eventDate = event.date
    ? new Date(...event.date.split("-").map((val, i) => (i === 1 ? val - 1 : val)))
    : null;

  const monthLabel = eventDate
    ? eventDate.toLocaleString("en-GB", { month: "short" }).toUpperCase()
    : "";

  const dayLabel = eventDate ? eventDate.getDate() : "";

  return (
    <Card className="event-card mb-4 shadow-sm border-0">
      {event.image && (
        <div className="event-image-wrapper">
          <div className="event-date-badge">
            <span className="event-date-month">{monthLabel}</span>
            <span className="event-date-day">{dayLabel}</span>
          </div>

          <Card.Img
            variant="top"
            src={event.image}
            alt={`${event.name} event`}
            className="event-image"
          />
        </div>
      )}

      <Card.Body>
        {isEditing ? (
          <>
            <EventForm
              initialData={event}
              onSubmit={handleEditSubmit}
              buttonText="Save Changes"
            />
            <Button
              variant="link"
              className="mt-2 p-0"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Card.Title className="mb-1">{event.name}</Card.Title>
            <Card.Subtitle className="mb-2">
              {event.category}
            </Card.Subtitle>

            {showDetails && (
              <>
                <p className="mb-1"><strong>Date:</strong> {event.date}</p>
                <p className="mb-1"><strong>Time:</strong> {event.time}</p>
                <p className="mb-1"><strong>Location:</strong> {event.location}</p>
                <p className="mb-2"><strong>Description:</strong> {event.description}</p>
              </>
            )}

            <div className="d-flex gap-3 mt-2 flex-wrap">
              <Button
                variant="link"
                className="p-0"
                aria-expanded={showDetails}
                onClick={() => setShowDetails((prev) => !prev)}
              >
                {showDetails ? "Hide Details" : "Show Details"}
              </Button>

              <Button
                variant="link"
                className="p-0"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>

              <Button
                variant="link"
                className="p-0 text-danger"
                onClick={() => deleteEvent(event.id)}
              >
                Delete
              </Button>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
}