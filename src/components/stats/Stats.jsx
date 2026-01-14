import { useState, useEffect } from "react";
import styles from "./Stats.module.css";

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "https://calcapi.marcuspff.com/api/public/stats"
        );
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

  if (loading) return <div className={styles.loading}>Fetching Data...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  const formatTime = (isoString) => {
    if (!isoString) return "";
    const timeString = isoString.endsWith("Z") ? isoString : isoString + "Z";

    return new Date(timeString).toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className={styles.container}>
      <h2>Global Statistics</h2>
      <p className={styles.intro}>
        Real-time metrics from the backend database.
      </p>

      <div className={styles.heroCard}>
        <span className={styles.heroLabel}>Total Calculations Logged</span>
        <span className={styles.heroValue}>{stats.total}</span>
      </div>

      <h3>Breakdown by Operation</h3>
      <div className={styles.grid}>
        {Object.entries(stats.byOperation).map(([op, count]) => (
          <div
            key={op}
            className={`${styles.statCard} ${getCardStyle(op, styles)}`}
          >
            <div className={styles.iconWrapper}>{getSymbol(op)}</div>
            <div className={styles.statInfo}>
              <span className={styles.opName}>{op}</span>
              <span className={styles.opCount}>{count}</span>
            </div>
          </div>
        ))}
      </div>

      <h3>Live Feed</h3>
      {stats.latest ? (
        <div className={styles.latestCard}>
          <div className={styles.latestHeader}>
            <div className={styles.userBadge}>
              <span className={styles.userIcon}>👤</span>
              {stats.latest.username}
            </div>
            <span className={styles.timestamp}>
              {formatTime(stats.latest.timestamp)}
            </span>
          </div>

          <div className={styles.codeBlock}>
            <span className={styles.number}>{stats.latest.num1}</span>
            <span className={styles.operator}>
              {" "}
              {getSymbol(stats.latest.operation)}{" "}
            </span>
            <span className={styles.number}>{stats.latest.num2}</span>
            <span className={styles.equals}> = </span>
            <span className={styles.result}>{stats.latest.result}</span>
          </div>
        </div>
      ) : (
        <p className={styles.noData}>No activity recorded yet.</p>
      )}
    </div>
  );
};

const getCardStyle = (op, styles) => {
  switch (op) {
    case "ADD":
      return styles.cardAdd;
    case "SUBTRACT":
      return styles.cardSub;
    case "MULTIPLY":
      return styles.cardMul;
    case "DIVIDE":
      return styles.cardDiv;
    default:
      return "";
  }
};

const getSymbol = (op) => {
  switch (op) {
    case "ADD":
      return "+";
    case "SUBTRACT":
      return "-";
    case "MULTIPLY":
      return "×";
    case "DIVIDE":
      return "÷";
    default:
      return "?";
  }
};

export default Stats;
