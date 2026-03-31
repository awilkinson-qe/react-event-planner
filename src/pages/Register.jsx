// Registration page
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import { UserContext } from "../context/UserContextValue";

export default function Register() {
  // Get register function from context
  const { register } = useContext(UserContext);
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");

  // Handle form state, validation, and submit logic
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.name.trim()) {
        errors.name = "Please enter your name.";
      }

      if (!values.email.trim()) {
        errors.email = "Please enter your email address.";
      } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = "Please enter a valid email address.";
      }

      if (!values.username.trim()) {
        errors.username = "Please enter a username.";
      }

      if (!values.password) {
        errors.password = "Please enter your password.";
      } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters.";
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = "Please confirm your password.";
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Passwords must match.";
      }

      return errors;
    },
    onSubmit: (values) => {
      setSubmitError("");

      const result = register({
        name: values.name,
        email: values.email,
        username: values.username,
        password: values.password,
      });

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
            <h1 className="auth-title">Create account</h1>
            <p className="auth-text">
              Register to start organising your appointments, meetings, and social events.
            </p>
          </div>

          <Form onSubmit={formik.handleSubmit} className="auth-form">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="name">Name</Form.Label>
              <Form.Control
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="form-error">{formik.errors.name}</div>
              )}
            </Form.Group>

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

            <Form.Group className="mb-3">
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control
                id="username"
                name="username"
                type="text"
                placeholder="Choose a username"
                autoComplete="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username && (
                <div className="form-error">{formik.errors.username}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                autoComplete="new-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="form-error">{formik.errors.password}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
              <Form.Control
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                autoComplete="new-password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="form-error">{formik.errors.confirmPassword}</div>
              )}
            </Form.Group>

            {submitError && <div className="form-error mb-3">{submitError}</div>}

            <Button type="submit" className="auth-btn" variant="primary">
              Register
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}