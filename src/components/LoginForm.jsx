import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../layout/components/LoginForm.css";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Importing icons

const LoginForm = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle the visibility
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="login-form">
          <div className="login-content">
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              className="input-field"
            />
            <label
              htmlFor="email"
              className={values.email ? "label-active" : ""}
            >
              Email
            </label>
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div className="login-content">
            <Field
              type={showPassword ? "text" : "password"} // Toggle the field type based on the state
              id="password"
              name="password"
              placeholder="Enter Your Password"
              className="input-field"
            />
            <label
              htmlFor="password"
              className={values.password ? "label-active" : ""}
            >
              Password
            </label>
            <IconButton
              onClick={togglePasswordVisibility}
              edge="end"
              aria-label="toggle password visibility"
              className="eye-icon"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
