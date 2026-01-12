import styles from './Calculator.module.css';

const Inputs = ({ num1, setNum1, num2, setNum2 }) => {
  return (
    <div className={styles.inputSection}>
      <input 
        type="number" 
        placeholder="Number A"
        value={num1}
        onChange={(e) => setNum1(e.target.value)} 
        className={styles.input}
      />

      <input 
        type="number" 
        placeholder="Number B"
        value={num2}
        onChange={(e) => setNum2(e.target.value)} 
        className={styles.input}
      />
    </div>
  );
};

export default Inputs;