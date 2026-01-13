import { useState } from "react";
import Inputs from "./Inputs";
import Buttons from "./Buttons";
import styles from "./Calculator.module.css";
import facade from "../../apiFacade"; 

const Calculator = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = async (operation) => {
    try {
      if (!num1 || !num2) return alert("Enter numbers!");

      const body = { num1: Number(num1), num2: Number(num2) };

      const options = facade.makeOptions("POST", true, body);

      const response = await fetch(
        `http://localhost:7070/api/calc/${operation}`,
        options
      );

      if (!response.ok) {
        throw new Error("Calculation failed or Unauthorized");
      }

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error(error);
      setResult("Error");
    }
  };

  return (
    <div className={styles.card}>
      <h2>API Calculator</h2>

      <Inputs num1={num1} setNum1={setNum1} num2={num2} setNum2={setNum2} />

      <Buttons doCalculation={handleCalculate} />

      <div className={styles.result}>
        Result: {result !== null ? result : "-"}
      </div>
    </div>
  );
};

export default Calculator;
