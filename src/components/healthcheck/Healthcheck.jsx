import { useState, useEffect } from "react";
import styles from "./Healthcheck.module.css";

const Healthcheck = () => {
  const [status, setStatus] = useState("Checking...");
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSystem = async () => {
      try {
        const response = await fetch(
          "https://calcapi.marcuspff.com/api/auth/healthcheck"
        );

        if (!response.ok) {
          throw new Error("Server responded with an error");
        }

        const data = await response.json();

        setStatus(data.msg);
        setIsOnline(true);
      } catch (error) {
        console.error(error);
        setStatus("System is unreachable");
        setIsOnline(false);
      } finally {
        setLoading(false);
      }
    };

    checkSystem();

    const interval = setInterval(checkSystem, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <h2>System Status</h2>

      <div className={styles.statusBox}>
        {loading ? (
          <div className={styles.spinner}></div>
        ) : (
          <div
            className={`${styles.indicator} ${
              isOnline ? styles.green : styles.red
            }`}
          ></div>
        )}

        <h3 className={styles.message}>{status}</h3>
      </div>

      <p className={styles.subtext}>
        {isOnline
          ? "Connection to Backend established successfully."
          : "Failed to connect to Backend. Please try again later."}
      </p>
    </div>
  );
};

export default Healthcheck;
