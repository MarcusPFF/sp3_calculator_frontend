import { useState, useEffect } from "react";
import styles from "./Healthcheck.module.css";

const Healthcheck = () => {
  const [status, setStatus] = useState("Initializing...");
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState(null);

  useEffect(() => {
    const checkSystem = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://calcapi.marcuspff.com/api/auth/healthcheck"
        );

        if (!response.ok) throw new Error("Server Error");

        const data = await response.json();
        setStatus(data.msg);
        setIsOnline(true);
      } catch (error) {
        console.error(error);
        setStatus("System Unreachable");
        setIsOnline(false);
      } finally {
        setLoading(false);
        setLastChecked(new Date().toLocaleTimeString());
      }
    };

    checkSystem();

    const interval = setInterval(checkSystem, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <h2>System Monitor</h2>
      {lastChecked && (
        <p className={styles.timestamp}>Last updated: {lastChecked}</p>
      )}

      <div
        className={`${styles.card} ${
          isOnline ? styles.cardOnline : styles.cardOffline
        }`}
      >
        <div className={styles.iconContainer}>
          {loading ? (
            <div className={styles.spinner}></div>
          ) : (
            <div
              className={`${styles.statusRing} ${
                isOnline ? styles.pulseGreen : styles.pulseRed
              }`}
            >
              {isOnline ? "✔" : "✖"}
            </div>
          )}
        </div>

        <div className={styles.info}>
          <h3 className={styles.statusText}>
            {loading ? "Checking..." : status}
          </h3>
          <p className={styles.subtext}>
            {loading
              ? "Pinging external server..."
              : isOnline
              ? "Secure connection to Java Backend established. All systems operational."
              : "Unable to reach the backend API. Services may be down."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Healthcheck;
