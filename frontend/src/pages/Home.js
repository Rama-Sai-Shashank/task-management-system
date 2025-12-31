import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className={styles.homeWrapper}>
      <div className={styles.homeCard}>
        <h2 className={styles.homeTitle}>Task Management System</h2>
        <p className={styles.homeSub}>
          Secure authentication & task dashboard
        </p>

        <div className={styles.homeButtons}>
          {!token ? (
            <>
              <button
                className={styles.primaryBtn}
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className={styles.outlineBtn}
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          ) : (
            <button
              className={styles.primaryBtn}
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
