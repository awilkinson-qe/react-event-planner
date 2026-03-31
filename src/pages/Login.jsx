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
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = "Please enter your email address.";
      } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = "Please enter a valid email address.";
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

      const result = login(values.email, values.password);

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
              <Form.Label htmlFor="email">Email Address</Form.Label>
              <Form.Control
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="form-error">{formik.errors.email}</div>
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