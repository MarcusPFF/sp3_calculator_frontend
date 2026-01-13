import styles from "./Information.module.css";

const Information = () => {
  return (
    <div className={styles.container}>
      <h2>About This Project</h2>
      
      <p className={styles.intro}>
        Welcome to the <strong>Full Stack Exam Calculator</strong>. 
        While using a server to calculate <code>2 + 2</code> is technically overkill, 
        this project serves a specific educational purpose.
      </p>

      <div className={styles.card}>
        <h3>The Purpose</h3>
        <p>
          The goal of this application is not to perform complex mathematics, 
          but to demonstrate the <strong>communication flow</strong> between a 
          modern Frontend and a robust Backend.
        </p>
        <p>
          Every button press triggers a real network request, proving that the 
          React Client and Java API are connected and exchanging data correctly.
        </p>
      </div>

      <h3>System Architecture</h3>
      
      <div className={styles.flowChart}>
        <div className={styles.step}>
          <span className={styles.icon}>⚛️</span>
          <span className={styles.label}>React Frontend</span>
          <span className={styles.sub}>Collects Input</span>
        </div>
        
        <div className={styles.arrow}>➜ <span className={styles.json}>JSON</span> ➜</div>
        
        <div className={styles.step}>
          <span className={styles.icon}>☕</span>
          <span className={styles.label}>Java API</span>
          <span className={styles.sub}>Business Logic</span>
        </div>

        <div className={styles.arrow}>➜ <span className={styles.data}>Data</span> ➜</div>

        <div className={styles.step}>
          <span className={styles.icon}>🗄️</span>
          <span className={styles.label}>Database</span>
          <span className={styles.sub}>Persists History</span>
        </div>
      </div>

      <div className={styles.features}>
        <h3>Key Features</h3>
        <ul>
          <li><strong>React Router:</strong> seamless page navigation.</li>
          <li><strong>Fetch API:</strong> Async communication with the backend.</li>
          <li><strong>Java Persistence:</strong> Calculations are saved to a database.</li>
          <li><strong>Responsive Design:</strong> Works on Mobile and Desktop.</li>
        </ul>
      </div>
    </div>
  );
};

export default Information;