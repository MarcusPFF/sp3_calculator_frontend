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
          json: value.body
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

  if (loading) return <h3 style={{textAlign:'center', color:'white'}}>Loading...</h3>;
  if (error) return <h3 style={{textAlign:'center', color:'red'}}>{error}</h3>;

  return (
    <div className={styles.container}>
      <h2>API Reference</h2>
      <p>Send a <strong>POST</strong> request to the following endpoints.</p>

      <div className={styles.list}>
        {examples.map((ex, index) => {
          const isAdmin = restrictedOperations.includes(ex.name);

          return (
            <div key={index} className={styles.item}>
              <div className={styles.header}>
                <h3>{ex.name}</h3>
                
                {isAdmin && <span className={styles.adminBadge}>Paid users only</span>}
              </div>

              <div className={styles.endpoint}>
                <span className={styles.method}>{ex.method}</span> 
                <span className={styles.url}>{ex.url}</span>
              </div>
              
              <pre className={styles.jsonBlock}>
{JSON.stringify(ex.json, null, 2)}
              </pre>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApiExamples;