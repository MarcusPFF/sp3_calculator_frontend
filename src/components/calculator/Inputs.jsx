import styles from "./Calculator.module.css";

const Inputs = ({ num1, setNum1, num2, setNum2 }) => {
  return (
    <div className={styles.inputSection}>
      <div className={styles.inputGroup}>
        <label>Input A</label>
        <input
          type="number"
          placeholder="0"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Input B</label>
        <input
          type="number"
          placeholder="0"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          className={styles.input}
        />
      </div>
    </div>
  );
};

export default Inputs;
