import styles from "./Dashboard.module.css";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // 🔐 Memoized auth header (IMPORTANT)
  const authHeader = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    [token]
  );

  // 👤 Fetch user profile
  const fetchProfile = useCallback(async () => {
    try {
      const res = await API.get("/auth/me", authHeader);
      setProfile(res.data);
    } catch (err) {
      console.error(err);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [authHeader, navigate]);

  // 📋 Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      const res = await API.get("/tasks", authHeader);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [authHeader]);

  // 🔄 Initial load
  useEffect(() => {
    fetchProfile();
    fetchTasks();
  }, [fetchProfile, fetchTasks]);

  // ➕ Add task
  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      await API.post("/tasks", { title: newTask }, authHeader);
      setNewTask("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Toggle task
  const toggleTask = async (task) => {
    try {
      await API.put(
        `/tasks/${task._id}`,
        { completed: !task.completed },
        authHeader
      );
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // 🗑 Delete task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`, authHeader);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔍 Search & filter
  const visibleTasks = tasks
    .filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    )
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
              navigate("/login");
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
        {loading ? (
          <p className={styles.userInfo}>Loading tasks...</p>
        ) : visibleTasks.length === 0 ? (
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
                  <span className={styles.completedBadge}>
                    Completed
                  </span>
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
