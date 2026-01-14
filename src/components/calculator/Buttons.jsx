import styles from "./Calculator.module.css";

const Buttons = ({ doCalculation, isAdmin }) => {
  return (
    <div className={styles.buttonGrid}>
      <button
        className={`${styles.btn} ${styles.btnAdd}`}
        onClick={() => doCalculation("add")}
      >
        Add (+)
      </button>

      <button
        className={`${styles.btn} ${styles.btnSub}`}
        onClick={() => doCalculation("subtract")}
      >
        Subtract (-)
      </button>

      <button
        className={`${styles.btn} ${styles.btnMul}`}
        onClick={() => doCalculation("multiply")}
        disabled={!isAdmin}
        title={!isAdmin ? "Restricted: Upgrade Required" : ""}
      >
        Multiply (×) {!isAdmin && ""}
      </button>

      <button
        className={`${styles.btn} ${styles.btnDiv}`}
        onClick={() => doCalculation("divide")}
        disabled={!isAdmin}
        title={!isAdmin ? "Restricted: Upgrade Required" : ""}
      >
        Divide (÷) {!isAdmin && ""}
      </button>
    </div>
  );
};

export default Buttons;
