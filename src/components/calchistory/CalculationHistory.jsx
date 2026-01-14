import { useState, useEffect } from "react";
import styles from "./CalculationHistory.module.css";

const CalculationHistory = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(
          "https://calcapi.marcuspff.com/api/public/calculations"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch history");
        }

        const data = await response.json();
        setHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className={styles.container}>
      <h2>System Logs</h2>
      <p className={styles.intro}>
        Recent calculation requests processed by the server.
      </p>

      {isLoading && <div className={styles.loading}>Loading Log Data...</div>}
      {error && <div className={styles.error}>{error}</div>}

      {!isLoading && !error && (
        <div className={styles.scrollContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Method</th>
                <th>Input A</th>
                <th>Input B</th>
                <th>Output</th>
              </tr>
            </thead>
            <tbody>
              {history.map((calc, index) => (
                <tr key={index}>
                  <td>
                    <span
                      className={`${styles.badge} ${getBadgeStyle(
                        calc.operation,
                        styles
                      )}`}
                    >
                      {calc.operation}
                    </span>
                  </td>
                  <td className={styles.number}>{calc.num1}</td>
                  <td className={styles.number}>{calc.num2}</td>
                  <td className={styles.result}>{calc.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!isLoading && history.length === 0 && (
        <p className={styles.noData}>No logs found.</p>
      )}
    </div>
  );
};

const getBadgeStyle = (op, styles) => {
  switch (op) {
    case "ADD":
      return styles.badgeAdd;
    case "SUBTRACT":
      return styles.badgeSub;
    case "MULTIPLY":
      return styles.badgeMul;
    case "DIVIDE":
      return styles.badgeDiv;
    default:
      return "";
  }
};

export default CalculationHistory;
