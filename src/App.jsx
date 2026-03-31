// Sets up the main app layout and routes
import { useContext } from "react";
import { HashRouter, Navigate, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddEvent from "./pages/AddEvent";
import Help from "./pages/Help";
import { UserContext } from "./context/UserContextValue";
import "./App.css";

// Only allow logged-in users to open protected pages
function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Keep logged-in users out of login and register pages
function PublicOnlyRoute({ children }) {
  const { user } = useContext(UserContext);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// Main app component
function App() {
  return (
    <HashRouter>
      <Header />
      <div className="app-shell">
        <main className="page-container">
          <Routes>
            <Route
              path="/"
              element={(
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/login"
              element={(
                <PublicOnlyRoute>
                  <Login />
                </PublicOnlyRoute>
              )}
            />
            <Route
              path="/register"
              element={(
                <PublicOnlyRoute>
                  <Register />
                </PublicOnlyRoute>
              )}
            />
            <Route
              path="/add-event"
              element={(
                <ProtectedRoute>
                  <AddEvent />
                </ProtectedRoute>
              )}
            />
            <Route path="/help" element={<Help />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;