// Mounts the React app into the root element
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Import Bootstrap for responsive styling
import "bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "./context/UserContext.jsx";
import { EventProvider } from "./context/EventContext.jsx";

// Makes user and event data available across the app using React Context
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <EventProvider>
        <App />
      </EventProvider>
    </UserProvider>
  </StrictMode>
);