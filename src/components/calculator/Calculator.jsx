import { useState, useEffect } from "react";
import Inputs from "./Inputs";
import Buttons from "./Buttons";
import styles from "./Calculator.module.css";
import facade from "../../apiFacade";

const Calculator = ({ loggedIn }) => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsAdmin(false);

    if (facade.loggedIn()) {
      const [, role] = facade.getUserNameAndRoles();
      if (role === "ADMIN") setIsAdmin(true);
    }
  }, [loggedIn]);

  const handleCalculate = async (operation) => {
    setError(null);
    setResult("Processing...");

    try {
      if (!num1 || !num2) {
        setResult(null);
        return setError("Input Missing: Enter valid numbers");
      }

      const body = { num1: Number(num1), num2: Number(num2) };
      const options = facade.makeOptions("POST", true, body);

      const response = await fetch(
        `https://calcapi.marcuspff.com/api/calc/${operation}`,
        options
      );

      if (!response.ok) throw new Error("Unauthorized Access");

      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      console.error(err);
      setResult(null);
      setError("Error: Access Denied or Invalid Input");
    }
  };

  return (
    <div className={styles.container}>
      <h2>System Calculator</h2>
      <p className={styles.intro}>
        Secure mathematical operations via remote API.
      </p>

      <div className={styles.card}>
        <div className={styles.headerRow}>
          <span className={styles.statusLabel}>Status: Ready</span>
          {isAdmin && <span className={styles.proBadge}>PAID USER</span>}
        </div>

        <div className={styles.screen}>
          {error ? (
            <span className={styles.errorText}>{error}</span>
          ) : (
            <span
              className={
                result !== null ? styles.resultText : styles.placeholderText
              }
            >
              {result !== null ? result : "0"}
            </span>
          )}
        </div>

        <Inputs num1={num1} setNum1={setNum1} num2={num2} setNum2={setNum2} />

        <Buttons doCalculation={handleCalculate} isAdmin={isAdmin} />
      </div>
    </div>
  );
};

export default Calculator;
