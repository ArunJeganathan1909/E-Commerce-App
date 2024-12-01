import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useAuth();

  const handleLogin = (values) => {
    login(values);
  };

  const handleRegister = (values) => {
    register(values);
  };

  return (
    <div>
      {isLogin ? (
        <>
          <h2>Login</h2>
          <LoginForm onSubmit={handleLogin} />
          <p>
            No account?{" "}
            <span
              style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
              onClick={() => setIsLogin(false)}
            >
              Register here
            </span>
          </p>
        </>
      ) : (
        <>
          <h2>Register</h2>
          <RegistrationForm onSubmit={handleRegister} />
          <p>
            Already have an account?{" "}
            <span
              style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
              onClick={() => setIsLogin(true)}
            >
              Login here
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default AuthPage;
