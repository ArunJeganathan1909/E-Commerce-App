import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, error } = useAuth();

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
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p>
            No account?{" "}
            <span className="account-verify" onClick={() => setIsLogin(false)}>
              Register here
            </span>
          </p>
        </>
      ) : (
        <>
          <h2>Register</h2>
          <RegistrationForm onSubmit={handleRegister} />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p>
            Already have an account?{" "}
            <span className="account-verify" onClick={() => setIsLogin(true)}>
              Login here
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default AuthPage;
