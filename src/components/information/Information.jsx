import styles from "./Information.module.css";

const Information = () => {
  return (
    <div className={styles.container}>
      <h2>Project Overview</h2>

      <p className={styles.intro}>
        <strong>Why use a server for 2 + 2?</strong>
        <br />I know—calculating simple math on a backend server is inefficient.
        However, this application acts as a <strong>Proof of Concept</strong>.
        It demonstrates that I can build a complete flow where a client (React)
        talks to a secured API (Java/Javalin) and persists data (PostgreSQL).
      </p>

      <div className={styles.card}>
        <h3>What is actually happening?</h3>
        <p>
          When you click "Add", the browser isn't doing the math. It bundles
          your numbers into a JSON object, attaches your security token, and
          fires it across the internet to my Digital Ocean droplet.
        </p>
        <p>
          The server validates who you are, performs the calculation, saves a
          log to the database, and sends the answer back. It's a lot of work for
          simple math, but it's the foundation for any complex web app.
        </p>
      </div>

      <h3>Under the Hood</h3>

      <div className={styles.flowChart}>
        <div className={styles.step}>
          <span className={styles.icon}>🖥️</span>
          <span className={styles.label}>Frontend</span>
          <span className={styles.sub}>React + Vite</span>
        </div>

        <div className={styles.arrow}>
          ➜ <span className={styles.json}>JSON</span> ➜
        </div>

        <div className={styles.step}>
          <span className={styles.icon}>☕</span>
          <span className={styles.label}>Backend</span>
          <span className={styles.sub}>Java + Javalin</span>
        </div>

        <div className={styles.arrow}>
          ➜ <span className={styles.data}>SQL</span> ➜
        </div>

        <div className={styles.step}>
          <span className={styles.icon}>💾</span>
          <span className={styles.label}>Database</span>
          <span className={styles.sub}>PostgreSQL</span>
        </div>
      </div>
    </div>
  );
};

export default Information;
