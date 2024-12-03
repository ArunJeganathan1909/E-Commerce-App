import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../layout/components/LoginForm.css";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../redux/user/userSlice"; 

const RegistrationForm = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        dispatch(updateStart());
        try {
          const response = await onSubmit(values); 
          dispatch(updateSuccess(response));
          alert("Successfully Registered!"); 
          setSubmitting(false);
        } catch (error) {
          dispatch(updateFailure(error.message));
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="login-form">
          <div className="login-content">
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="Enter Your Name"
              className="input-field"
            />
            <label htmlFor="name" className={values.name ? "label-active" : ""}>
              Name
            </label>
            <ErrorMessage name="name" component="div" className="error" />
          </div>

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
              type={showPassword ? "text" : "password"}
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

          <div className="login-content">
            <Field
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Your Password"
              className="input-field"
            />
            <label
              htmlFor="confirmPassword"
              className={values.confirmPassword ? "label-active" : ""}
            >
              Confirm Password
            </label>
            <IconButton
              onClick={toggleConfirmPasswordVisibility}
              edge="end"
              aria-label="toggle confirm password visibility"
              className="eye-icon"
            >
              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="error"
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
