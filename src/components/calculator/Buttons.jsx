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

      {isAdmin && (
        <>
          <button
            className={styles.mulBtn}
            onClick={() => doCalculation("multiply")}
          >
            Multiply (x)
          </button>

          <button
            className={styles.divBtn}
            onClick={() => doCalculation("divide")}
          >
            Divide (÷)
          </button>
        </>
      )}
    </div>
  );
};

export default Buttons;
