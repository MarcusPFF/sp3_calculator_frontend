import styles from "./Calculator.module.css";

const Buttons = ({ doCalculation }) => {
  return (
    <div className={styles.buttonSection}>
      <button className={styles.addBtn} onClick={() => doCalculation("add")}>
        Add
      </button>

      <button
        className={styles.subBtn}
        onClick={() => doCalculation("subtract")}
      >
        Subtract
      </button>
    </div>
  );
};

export default Buttons;
