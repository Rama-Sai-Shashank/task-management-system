import styles from "./Register.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register(){
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const nav=useNavigate();

  const register=async()=>{
    await axios.post("http://127.0.0.1:8000/auth/register",{name,email,password});
    nav("/login");
  };

  return(
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.title}>Create your account</div>
        <div className={styles.sub}>It takes less than a minute</div>

        <input className={styles.input} placeholder="Full name"
          onChange={e=>setName(e.target.value)} />
        <input className={styles.input} placeholder="Email"
          onChange={e=>setEmail(e.target.value)} />
        <input type="password" className={styles.input} placeholder="Password"
          onChange={e=>setPassword(e.target.value)} />

        <button className={styles.primary} onClick={register}>Create account</button>

        <div className={styles.footer}>
          Already have an account? <Link className={styles.link} to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
