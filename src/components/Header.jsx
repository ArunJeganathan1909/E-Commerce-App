import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/img/logo1.png";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../AuthContext";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import "../layout/components/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useAuth();
  const [showMenuModal, setShowMenuModal] = useState(false);
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);

  const handleLogin = (values) => {
    login(values);
    setShowAuthModal(false);
  };

  const handleRegister = (values) => {
    register(values);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    dispatch(signoutSuccess());
    setShowMenuModal(false);
    alert("You have been logged out.");
  };

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <header className="header-area">
      <div className="header-logo-smaller">
        <a onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <img alt="logo" className="img-fluid" src={logo} />
        </a>
      </div>

      <div className="company-logo-larger">
        <a onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <img src={logo} alt="logo" />
        </a>
      </div>

      <div className="main-menu">
        <div className="menu-list">
          <div>
            <a
              onClick={() => navigate("/")}
              className={`drop-down ${isActive("/")}`}
              style={{ cursor: "pointer" }}
            >
              Home
            </a>
          </div>
          <div>
            <a
              onClick={() => navigate("/product")}
              className={`drop-down ${isActive("/product")}`}
              style={{ cursor: "pointer" }}
            >
              Products
            </a>
          </div>
          <div>
            <a
              onClick={() => navigate("/about")}
              className={`drop-down ${isActive("/about")}`}
              style={{ cursor: "pointer" }}
            >
              About Us
            </a>
          </div>
          <div>
            <a
              onClick={() => navigate("/contact")}
              className={`drop-down ${isActive("/contact")}`}
              style={{ cursor: "pointer" }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <div className="right-nav">
        <div className="icon-list">
          <div className="icon-list-menu" onClick={() => navigate("/cart")}>
            <ShoppingCartIcon fontSize="small" />
          </div>
          <div
            className="icon-list-menu"
            onClick={() => navigate("/dashboard")}
          >
            <PersonIcon fontSize="small" />
          </div>
          <div
            className="icon-list-menu"
            onClick={() => {
              if (currentUser) {
                handleLogout();
              } else {
                setShowAuthModal(true);
              }
            }}
            style={{ cursor: "pointer", color: "var(--primary-color1)" }}
            id={currentUser ? "logout" : "login"}
          >
            <span>
              <LoginIcon fontSize="small" />
            </span>
            <span>{currentUser ? "LOGOUT" : "LOGIN"}</span>
          </div>
        </div>
      </div>

      <IconButton
        className="sidebar-button mobile-menu-btn"
        onClick={() => setShowMenuModal(true)}
      >
        <MenuIcon />
      </IconButton>

      {showMenuModal && (
        <div className="menu-modal">
          <div className="menu-modal-content">
            <div className="menu-modal-header">
              <div className="header-logo-smaller">
                <a onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                  <img alt="logo" className="img-fluid" src={logo} />
                </a>
              </div>
              <IconButton
                onClick={() => setShowMenuModal(false)}
                className="close-modal"
              >
                <CloseIcon />
              </IconButton>
            </div>
            <div className="menu-list">
              <div>
                <a
                  onClick={() => {
                    navigate("/");
                    setShowMenuModal(false);
                  }}
                  className={`drop-down ${isActive("/")}`}
                  style={{ cursor: "pointer" }}
                >
                  Home
                </a>
              </div>
              <div>
                <a
                  onClick={() => {
                    navigate("/product");
                    setShowMenuModal(false);
                  }}
                  className={`drop-down ${isActive("/product")}`}
                  style={{ cursor: "pointer" }}
                >
                  Products
                </a>
              </div>
              <div>
                <a
                  onClick={() => {
                    navigate("/cart");
                    setShowMenuModal(false);
                  }}
                  className={`drop-down ${isActive("/cart")}`}
                  style={{ cursor: "pointer" }}
                >
                  Cart
                </a>
              </div>
              <div>
                <a
                  onClick={() => {
                    navigate("/about");
                    setShowMenuModal(false);
                  }}
                  className={`drop-down ${isActive("/about")}`}
                  style={{ cursor: "pointer" }}
                >
                  About Us
                </a>
              </div>
              <div>
                <a
                  onClick={() => {
                    navigate("/contact");
                    setShowMenuModal(false);
                  }}
                  className={`drop-down ${isActive("/contact")}`}
                  style={{ cursor: "pointer" }}
                >
                  Contact Us
                </a>
              </div>
            </div>
            <div className="icon-list-menu-mobile-container">
              <div
                className="icon-list-menu-mobile"
                onClick={() => {
                  navigate("/dashboard");
                  setShowMenuModal(false);
                }}
              >
                <PersonIcon fontSize="medium" />
                <span>DASHBOARD</span>
              </div>
              <div
                className="icon-list-menu-mobile"
                onClick={() => {
                  if (currentUser) {
                    handleLogout();
                    setShowMenuModal(false);
                  } else {
                    setShowAuthModal(true);
                    setShowMenuModal(false);
                  }
                }}
              >
                <span>
                  <LoginIcon fontSize="medium" />
                </span>
                <span>{currentUser ? "LOGOUT" : "LOGIN"}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAuthModal && (
        <div className="auth-modal">
          <div className="auth-modal-content">
            <div className="auth-modal-header">
              <div className="auth-modal-header-head">Verify your profile</div>
              <IconButton
                onClick={() => setShowAuthModal(false)}
                className="close-modal"
              >
                <CloseIcon />
              </IconButton>
            </div>
            {isLogin ? (
              <>
                <h2 className="form-heading">Login</h2>
                <LoginForm
                  onSubmit={handleLogin}
                  closeAuthModal={() => setShowAuthModal(false)}
                />
                <p>
                  No account?{" "}
                  <span
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() => setIsLogin(false)}
                  >
                    Register here
                  </span>
                </p>
              </>
            ) : (
              <>
                <h2 className="form-heading">Register</h2>
                <RegistrationForm onSubmit={handleRegister} />
                <p>
                  Already have an account?{" "}
                  <span
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() => setIsLogin(true)}
                  >
                    Login here
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
