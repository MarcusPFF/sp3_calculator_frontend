import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import facade from "../../apiFacade";
import styles from "./Header.module.css";

const Header = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        setError("");
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
    setCredentials({ username: "", password: "" });
    navigate("/");
  };

  const onChange = (evt) => {
    setCredentials({ ...credentials, [evt.target.id]: evt.target.value });
  };

  const performLogin = async (evt) => {
    evt.preventDefault();
    setError("");

    try {
      await facade.login(credentials.username, credentials.password);
      setLoggedIn(true);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to login");
    }
  };

  const performRegister = async (evt) => {
    evt.preventDefault();
    setError("");

    try {
      await facade.register(credentials.username, credentials.password);
      await facade.login(credentials.username, credentials.password);
      setLoggedIn(true);
      navigate("/");
    } catch (err) {
      if (err.fullError) {
        const e = await err.fullError;
        setError(e.message);
      } else {
        setError("Registration failed");
      }
    }
  };

  let username = "";
  if (loggedIn) {
    try {
      username = facade.getUserNameAndRoles()[0];
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
          end
        >
          Calculator
        </NavLink>
        <NavLink
          to="/calculations"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          History
        </NavLink>
        <NavLink
          to="/stats"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Stats
        </NavLink>
        <NavLink
          to="/examples"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Examples
        </NavLink>
        <NavLink
          to="/info"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Info
        </NavLink>
        <NavLink
          to="/healthcheck"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          System
        </NavLink>
      </nav>

      <div className={styles.authSection}>
        {loggedIn ? (
          <div className={styles.loggedInBox}>
            <span className={styles.welcomeMsg}>
              Hello, <strong>{username}</strong>
            </span>
            <button onClick={logout} className={styles.logoutBtn}>
              Logout
            </button>
          </div>
        ) : (
          <form className={styles.loginForm}>
            {error && <span className={styles.errorTooltip}>{error}</span>}

            <input
              className={styles.input}
              id="username"
              placeholder="Username"
              onChange={onChange}
              value={credentials.username}
            />
            <input
              className={styles.input}
              type="password"
              id="password"
              placeholder="Password"
              onChange={onChange}
              value={credentials.password}
            />

            <button onClick={performLogin} className={styles.loginBtn}>
              Login
            </button>
            <button onClick={performRegister} className={styles.signupBtn}>
              Sign Up
            </button>
          </form>
        )}
      </div>
    </header>
  );
};

export default Header;
