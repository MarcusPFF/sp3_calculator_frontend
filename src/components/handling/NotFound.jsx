import { useParams, useNavigate } from "react-router";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const params = useParams();
  const navigate = useNavigate();
  const filepath = params["*"];

  return (
    <div className={styles.container}>
      <h2>404 - System Error</h2>

      <div className={styles.card}>
        <div className={styles.icon}>⚠️</div>
        <p className={styles.message}>
          The requested module could not be located.
        </p>

        <div className={styles.pathBox}>
          <span className={styles.label}>Missing Path:</span>
          <code className={styles.filepath}>/{filepath}</code>
        </div>

        <button className={styles.backBtn} onClick={() => navigate("/")}>
          Return to Base
        </button>
      </div>
    </div>
  );
};
export default NotFound;
