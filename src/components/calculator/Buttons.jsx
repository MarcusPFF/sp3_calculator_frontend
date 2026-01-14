import styles from "./Calculator.module.css";

const Buttons = ({ doCalculation, isAdmin }) => {
  return (
    <div className={styles.buttonSection}>
      <button className={styles.addBtn} onClick={() => doCalculation("add")}>
        Add (+)
      </button>

      <button
        className={styles.subBtn}
        onClick={() => doCalculation("subtract")}
      >
        Subtract (-)
      </button>

      <button
        className={styles.mulBtn}
        onClick={() => doCalculation("multiply")}
        disabled={!isAdmin} 
        title={!isAdmin ? "Upgrade to unlock this feature" : ""}
      >
        Multiply (x) {isAdmin ? "" : ""}
      </button>

      <button
        className={styles.divBtn}
        onClick={() => doCalculation("divide")}
        disabled={!isAdmin}
        title={!isAdmin ? "Upgrade to unlock this feature" : ""}
      >
        Divide (÷) {isAdmin ? "" : ""}
      </button>
    </div>
  );
};

export default Buttons;