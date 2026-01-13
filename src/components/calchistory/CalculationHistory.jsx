import { useState, useEffect } from "react";
import styles from "./CalculationHistory.module.css";

const CalculationHistory = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Skift til calcapi.marcuspff.com
        const response = await fetch("http://localhost:7070/api/public/calculations");
        
        if (!response.ok) {
          throw new Error("Failed to fetch history");
        }

        const data = await response.json();
        setHistory(data); // Put the JSON into our array
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
      <h2>Recent Calculations</h2>

      {/* Conditional Rendering */}
      {isLoading && <p>Loading data...</p>}
      {error && <p className={styles.error}>{error}</p>}

      
      {!isLoading && !error && (

       <div className={styles.scrollContainer}>
          <table className={styles.table}>
            <thead>

              <tr>
                <th style={{position: 'sticky', top: 0, zIndex: 1}}>Operation</th>
                <th style={{position: 'sticky', top: 0, zIndex: 1}}>Num 1</th>
                <th style={{position: 'sticky', top: 0, zIndex: 1}}>Num 2</th>
                <th style={{position: 'sticky', top: 0, zIndex: 1}}>Result</th>
              </tr>
            </thead>
            <tbody>
              {history.map((calc, index) => (
                <tr key={index}> 
                  <td>{calc.operation}</td>
                  <td>{calc.num1}</td>
                  <td>{calc.num2}</td>
                  <td className={styles.result}>{calc.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {!isLoading && history.length === 0 && <p>No history found.</p>}
    </div>
  );
};

export default CalculationHistory;