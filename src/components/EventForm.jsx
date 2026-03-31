// Reusable form used for adding and editing events
import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Options for the category dropdown
const eventCategories = [
  "Meeting",
  "Appointment",
  "Food",
  "Travel",
  "Party",
  "Concert",
  "Fitness",
  "Study",
  "Family",
  "Other",
];

// Map each category to an image shown on the event card
const categoryImages = {
  Meeting: `${import.meta.env.BASE_URL}images/meeting.jpg`,
  Appointment: `${import.meta.env.BASE_URL}images/appointment.jpg`,
  Food: `${import.meta.env.BASE_URL}images/food.jpg`,
  Travel: `${import.meta.env.BASE_URL}images/travel.jpg`,
  Party: `${import.meta.env.BASE_URL}images/party.jpg`,
  Concert: `${import.meta.env.BASE_URL}images/concert.jpg`,
  Fitness: `${import.meta.env.BASE_URL}images/fitness.jpg`,
  Study: `${import.meta.env.BASE_URL}images/study.jpg`,
  Family: `${import.meta.env.BASE_URL}images/family.jpg`,
  Other: `${import.meta.env.BASE_URL}images/other.jpg`,
};

// Convert stored date/time strings into Date objects for the picker
function splitDateAndTime(dateString, timeString) {
  const selectedDate = dateString
    ? (() => {
        const [year, month, day] = dateString.split("-").map(Number);
        return new Date(year, month - 1, day);
      })()
    : null;

  let selectedTime = null;
  if (timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    selectedTime = new Date();
    selectedTime.setHours(hours || 0);
    selectedTime.setMinutes(minutes || 0);
    selectedTime.setSeconds(0);
    selectedTime.setMilliseconds(0);
  }

  return { selectedDate, selectedTime };
}

// Format date for storage (YYYY-MM-DD)
function formatDate(date) {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Format time for storage (HH:MM)
function formatTime(time) {
  if (!time) return "";
  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export default function EventForm({
  onSubmit,
  initialData,
  buttonText = "Add Event",
}) {
  // If editing, convert stored values back into Date objects
  const initialValues = initialData
    ? splitDateAndTime(initialData.date, initialData.time)
    : { selectedDate: null, selectedTime: null };

  const formik = useFormik({
    initialValues: {
      name: initialData?.name || "",
      category: initialData?.category || "",
      date: initialValues.selectedDate,
      time: initialValues.selectedTime,
      description: initialData?.description || "",
      location: initialData?.location || "",
    },

    validate: (values) => {
      const errors = {};

      if (!values.name.trim()) {
        errors.name = "Please enter an event name.";
      } else if (values.name.trim().length > 60) {
        errors.name = "Event name must be 60 characters or less.";
      }

      if (!values.category) {
        errors.category = "Please select a category.";
      }

      if (!values.date) {
        errors.date = "Please select a date.";
      }

      if (!values.time) {
        errors.time = "Please select a time.";
      }

      if (!values.description.trim()) {
        errors.description = "Please enter a description.";
      } else if (values.description.trim().length > 1000) {
        errors.description = "Description must be 1000 characters or less.";
      }

      if (!values.location.trim()) {
        errors.location = "Please enter a location.";
      } else if (values.location.trim().length > 100) {
        errors.location = "Location must be 100 characters or less.";
      }

      return errors;
    },

    // Build the event object and pass it up to the parent component
    onSubmit: (values, { resetForm }) => {
      const selectedCategory = values.category || "Other";

      const formData = {
        ...(initialData?.id ? { id: initialData.id } : {}),
        name: values.name.trim(),
        date: formatDate(values.date),
        time: formatTime(values.time),
        description: values.description.trim(),
        location: values.location.trim(),
        category: selectedCategory,
        image: categoryImages[selectedCategory],
      };

      if (typeof onSubmit === "function") {
        onSubmit(formData);
      }

      // Only reset when adding a new event
      if (!initialData) {
        resetForm({
          values: {
            name: "",
            category: "",
            date: null,
            time: null,
            description: "",
            location: "",
          },
        });
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} autoComplete="off">
      <Form.Group className="mb-3">
        <Form.Label htmlFor="name">Event Name</Form.Label>
        <Form.Control
          id="name"
          name="name"
          type="text"
          placeholder="Enter the event name"
          autoComplete="off"
          maxLength={60}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="form-text">{formik.values.name.length}/60 characters</div>
        {formik.touched.name && formik.errors.name && (
          <div className="form-error">{formik.errors.name}</div>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="category">Category</Form.Label>
        <Form.Select
          id="category"
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="">Select a category</option>
          {eventCategories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Form.Select>
        {formik.touched.category && formik.errors.category && (
          <div className="form-error">{formik.errors.category}</div>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="event-date">Date</Form.Label>
        <DatePicker
          id="event-date"
          selected={formik.values.date}
          onChange={(date) => formik.setFieldValue("date", date)}
          onBlur={() => formik.setFieldTouched("date", true)}
          dateFormat="dd MMM yyyy"
          placeholderText="Select a date"
          className="form-control"
        />
        {formik.touched.date && formik.errors.date && (
          <div className="form-error">{formik.errors.date}</div>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="event-time">Time</Form.Label>
        <DatePicker
          id="event-time"
          selected={formik.values.time}
          onChange={(time) => formik.setFieldValue("time", time)}
          onBlur={() => formik.setFieldTouched("time", true)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="HH:mm"
          placeholderText="Select a time"
          className="form-control"
        />
        {formik.touched.time && formik.errors.time && (
          <div className="form-error">{formik.errors.time}</div>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="description">Description</Form.Label>
        <Form.Control
          id="description"
          name="description"
          as="textarea"
          rows={4}
          placeholder="Add a short description"
          maxLength={1000}
          autoComplete="off"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="form-text">
          {formik.values.description.length}/1000 characters
        </div>
        {formik.touched.description && formik.errors.description && (
          <div className="form-error">{formik.errors.description}</div>
        )}
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label htmlFor="location">Location</Form.Label>
        <Form.Control
          id="location"
          name="location"
          type="text"
          placeholder="Enter the location"
          autoComplete="off"
          maxLength={100}
          value={formik.values.location}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="form-text">
          {formik.values.location.length}/100 characters
        </div>
        {formik.touched.location && formik.errors.location && (
          <div className="form-error">{formik.errors.location}</div>
        )}
      </Form.Group>

      <Button type="submit" className="auth-btn" variant="primary">
        {buttonText}
      </Button>
    </Form>
  );
}