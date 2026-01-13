import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import facade from "../../apiFacade";
import styles from "./Header.module.css";

const Header = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [isPaidSignup, setIsPaidSignup] = useState(false);
  const [secretCode, setSecretCode] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => setError(""), 5000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
    setCredentials({ username: "", password: "" });
    setIsPaidSignup(false);
    setSecretCode("");
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

    let role = "GUEST";
    if (isPaidSignup) {
      if (secretCode === "exam2026") {
        role = "ADMIN";
      } else {
        setError("Wrong Secret Code!");
        return;
      }
    }

    try {
      await facade.register(credentials.username, credentials.password, role);
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
      const token = facade.getToken();
      const payload = JSON.parse(window.atob(token.split(".")[1]));
      username = payload.username || payload.sub || payload.name;
    } catch (e) {
      console.error("Could not decode token", e);
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

            <div className={styles.paidToggle}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={isPaidSignup}
                  onChange={(e) => setIsPaidSignup(e.target.checked)}
                />
                <span className={styles.tooltip}>Paid?</span>
              </label>
            </div>

            {isPaidSignup && (
              <input
                className={`${styles.input} ${styles.secretInput}`}
                placeholder="Code"
                type="password"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
              />
            )}

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
