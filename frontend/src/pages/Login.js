import styles from "./Login.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const login = async () => {
    try {
      const r = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", r.data.access_token);
      nav("/dashboard");
    } catch (err) {
      alert("Login failed. Check email/password");
      console.error(err);
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.title}>Welcome back</div>
          <div className={styles.sub}>Login to continue</div>
        </div>

        <div className={styles.field}>
          <input
            className={styles.input}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <input
            type="password"
            className={styles.input}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className={styles.primary} onClick={login}>
          Login
        </button>

        <div className={styles.footer}>
          New here?{" "}
          <Link className={styles.link} to="/register">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
