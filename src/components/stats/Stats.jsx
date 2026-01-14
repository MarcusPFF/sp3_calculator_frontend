import { useState, useEffect } from "react";
import styles from "./Stats.module.css";

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("https://calcapi.marcuspff.com/api/public/stats");
        if (!response.ok) throw new Error("Failed to load statistics");

        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className={styles.loading}>Loading Stats...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h2>Global Statistics</h2>

      <div className={styles.totalBox}>
        <span className={styles.totalLabel}>Total Calculations</span>
        <span className={styles.totalValue}>{stats.total}</span>
      </div>

      <h3>By Operation</h3>
      <div className={styles.grid}>
        {Object.entries(stats.byOperation).map(([op, count]) => (
          <div key={op} className={styles.statCard}>
            <div className={styles.opName}>{op}</div>
            <div className={styles.opCount}>{count}</div>
          </div>
        ))}
      </div>

      <h3>Latest Activity</h3>
      {stats.latest ? (
        <div className={styles.latestCard}>
          <div className={styles.latestHeader}>
            <span className={styles.userIcon}>👤 {stats.latest.username}</span>
            <span className={styles.time}>
              {new Date(stats.latest.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <div className={styles.equation}>
            {stats.latest.num1}
            <span className={styles.operator}>
              {" "}
              {getSymbol(stats.latest.operation)}{" "}
            </span>
            {stats.latest.num2}
            <span className={styles.equals}> = </span>
            <span className={styles.result}>{stats.latest.result}</span>
          </div>
        </div>
      ) : (
        <p>No activity yet.</p>
      )}
    </div>
  );
};

const getSymbol = (op) => {
  switch (op) {
    case "ADD":
      return "+";
    case "SUBTRACT":
      return "-";
    case "MULTIPLY":
      return "x";
    case "DIVIDE":
      return "÷";
    default:
      return "?";
  }
};

export default Stats;
