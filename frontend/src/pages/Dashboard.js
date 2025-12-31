// Dashboard.js
import styles from "./Dashboard.module.css";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const fetchProfile = useCallback(async () => {
    const res = await axios.get("http://127.0.0.1:8000/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProfile(res.data);
  }, [token]);

  const fetchTasks = useCallback(async () => {
    const res = await axios.get("http://127.0.0.1:8000/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  }, [token]);

  useEffect(() => {
    fetchProfile();
    fetchTasks();
  }, [fetchProfile, fetchTasks]);

  const addTask = async () => {
    if (!newTask.trim()) return;
    await axios.post(
      "http://127.0.0.1:8000/tasks",
      { title: newTask },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setNewTask("");
    fetchTasks();
  };

  const toggleTask = async (task) => {
    await axios.put(
      `http://127.0.0.1:8000/tasks/${task._id}`,
      { completed: !task.completed },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  };

  const visibleTasks = tasks
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => {
      if (filter === "completed") return t.completed;
      if (filter === "pending") return !t.completed;
      return true;
    });

  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.dashboardCard}>
        {/* Header */}
        <div className={styles.dashboardHeader}>
          <div>
            <h3 className={styles.dashboardTitle}>Dashboard</h3>
            {profile && (
              <p className={styles.userInfo}>
                {profile.name} • {profile.email}
              </p>
            )}
          </div>

          <button
            className={styles.logoutBtn}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>

        {/* Controls */}
        <div className={styles.taskControls}>
          <input
            className={`${styles.taskInput} ${styles.textInput}`}
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />

          <button className={styles.addBtn} onClick={addTask}>
            Add
          </button>

          <input
            className={`${styles.taskInput} ${styles.textInput}`}
            placeholder="Search tasks"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className={`${styles.taskInput} ${styles.selectInput}`}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Task List */}
        {visibleTasks.length === 0 ? (
          <p className={styles.userInfo}>No tasks found</p>
        ) : (
          visibleTasks.map((task) => (
            <div
              key={task._id}
              className={`${styles.taskItem} ${
                task.completed ? styles.completedTask : ""
              }`}
            >
              <div className={styles.taskLeft}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task)}
                  className={styles.taskCheckbox}
                />

                <span
                  className={
                    task.completed
                      ? styles.taskTextCompleted
                      : styles.taskText
                  }
                >
                  {task.title}
                </span>

                {task.completed && (
                  <span className={styles.completedBadge}>Completed</span>
                )}
              </div>

              <button
                className={styles.deleteBtn}
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
