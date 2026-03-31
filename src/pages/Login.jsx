// Login page
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import { UserContext } from "../context/UserContextValue";

export default function Login() {
  // Get login function from context
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");

  // Handle form state, validation, and submit logic
  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.identifier.trim()) {
        errors.identifier = "Please enter your email address or username.";
      }

      if (!values.password) {
        errors.password = "Please enter your password.";
      } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters.";
      }

      return errors;
    },
    onSubmit: (values) => {
      setSubmitError("");

      const result = login(values.identifier, values.password);

      if (!result.success) {
        setSubmitError(result.message);
        return;
      }

      navigate("/");
    },
  });

  return (
    <div className="content-page">
      <div className="content-shell">
        <div className="content-panel content-panel-medium">
          <div className="auth-copy">
            <p className="auth-kicker">Timeline</p>
            <h1 className="auth-title">Welcome back</h1>
            <p className="auth-text">
              Sign in to view, manage, and update your upcoming events.
            </p>
          </div>

          <Form onSubmit={formik.handleSubmit} className="auth-form">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="identifier">Email or Username</Form.Label>
              <Form.Control
                id="identifier"
                name="identifier"
                type="text"
                placeholder="Enter your email or username"
                autoComplete="username"
                value={formik.values.identifier}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.identifier && formik.errors.identifier && (
                <div className="form-error">{formik.errors.identifier}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="form-error">{formik.errors.password}</div>
              )}
            </Form.Group>

            {submitError && <div className="form-error mb-3">{submitError}</div>}

            <Button type="submit" className="auth-btn" variant="primary">
              Log in
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}