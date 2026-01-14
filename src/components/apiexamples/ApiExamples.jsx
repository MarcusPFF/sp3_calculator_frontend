import { useState, useEffect } from "react";
import styles from "./ApiExamples.module.css";

const ApiExamples = () => {
  const [examples, setExamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const restrictedOperations = ["MULTIPLY", "DIVIDE"];

  useEffect(() => {
    const fetchExamples = async () => {
      try {
        const url = "https://calcapi.marcuspff.com/api/public/examples";
        const response = await fetch(url);
        if (!response.ok) throw new Error("Could not fetch examples");

        const data = await response.json();

        const list = Object.entries(data).map(([key, value]) => ({
          name: key.toUpperCase(),
          method: value.method,
          url: value.path,

          fullRequest: {
            method: value.method,
            path: value.path,
            body: value.body,
          },
        }));

        setExamples(list);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExamples();
  }, []);

  if (loading) return <div className={styles.loading}>Loading API Docs...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h2>API Documentation</h2>
      <p className={styles.intro}>
        All endpoints are prefixed with <code>/api/calc</code>.
        <br />
        Standard operations are open, while complex calculations require a{" "}
        <strong>valid Bearer Token</strong> with paid user privileges.
      </p>

      <div className={styles.grid}>
        {examples.map((ex, index) => {
          const isRestricted = restrictedOperations.includes(ex.name);

          return (
            <div key={index} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.titleGroup}>
                  <span className={styles.methodBadge}>{ex.method}</span>
                  <h3>{ex.name}</h3>
                </div>

                {isRestricted && <span className={styles.proBadge}>Paid</span>}
              </div>

              <div className={styles.urlBar}>
                <span className={styles.path}>{ex.url}</span>
              </div>

              <div className={styles.codeLabel}>Full Request Structure</div>

              <pre className={styles.codeBlock}>
                {JSON.stringify(ex.fullRequest, null, 2)}
              </pre>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApiExamples;
