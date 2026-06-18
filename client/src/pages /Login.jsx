import { useEffect,useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import axios from "axios";

function Login() {
    const [issues, setIssues] = useState([]);

    const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [stats, setStats] = useState({
    issuesReported: 0,
    residentsHelped: 0,
    aiSuggestions: 0,
    sustainabilityDrives: 0
});

    // LOADING STATE
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {

        const fetchStats = async () => {

            try {

                const res = await axios.get(
                    "https://smart-community-management-system.onrender.com/api/stats"
                );

                setStats(res.data);

            } catch (error) {

                console.log(error);

            }
        };

        fetchStats();

    }, []);
 

   const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    if (!email || !password) {
        setError("All fields are required");
        return;
    }

    if (!email.includes("@")) {
        setError("Enter a valid email");
        return;
    }

    if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
    }

    setLoading(true);

    try {

        const res = await API.post("/auth/login", {
            email,
            password
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);

        setLoading(false);
        toast.success("Login Successful");
        navigate("/dashboard");

    } catch (error) {

        setLoading(false);
        toast.error("Invalid Email or Password");
        
    }
};


return (

<>
    <div className="login-page">
        <div className="bg-circle circle1"></div>
<div className="bg-circle circle2"></div>
<div className="bg-circle circle3"></div>
        

        <div className="login-left">

            <h1 className="hero-title">
    Smart Community Management System
</h1>

            <p>
                Experience smarter community management with
                a unified platform for issue reporting,
                resolution tracking, and sustainability monitoring.
                Empower residents and administrators with
                real-time insights, seamless communication,
                and AI-powered suggestions.
            </p>
<img
    src="/smart.png"
    alt="Smart Community"
    className="login-image"
/>

        </div>

        <div className="login-container">

            
            <h1>Login</h1>

{error && (
    <p className="error-text">
        {error}
    </p>
)}

<form onSubmit={handleLogin}>

    <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
    />

  <div className="password-box">

    <input
        type={showPassword ? "text" : "password"}
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
    />

    <span
        className="eye-icon"
        onClick={() => setShowPassword(!showPassword)}
    >
        {showPassword ? "🙈" : "👁️"}
    </span>

</div>

    <button type="submit">
        {
            loading
            ? "Logging in..."
            : "Login"
        }
    </button>

    <p className="auth-switch">
        New user?
        <span onClick={() => navigate("/register")}>
            Create Account
        </span>
    </p>

</form>

        </div>
          <div className="stats-section">

        <div className="stats-section">

    <div className="stat-card">
        <h2>{stats.issuesReported}</h2>
        <p>Issues Reported</p>
    </div>

    <div className="stat-card">
        <h2>{stats.aiSuggestions}</h2>
        <p>AI Suggestions</p>
    </div>

    <div className="stat-card">
        <h2>{stats.sustainabilityDrives}</h2>
        <p>Sustainability Drives</p>
    </div>

    <div className="stat-card">
        <h2>{stats.residentsHelped}</h2>
        <p>Residents Helped</p>
    </div>

</div>
    </div>

    </div>
    <div className="workflow-section">

    <h2>How It Works</h2>

    <div className="workflow">

       <div className="step">
        <div className="step-icon">📢</div>
        <p>Report Issue</p>
    </div>

    <div className="arrow">→</div>

    <div className="step">
        <div className="step-icon">👨‍💼</div>
        <p>Admin Review</p>
    </div>

    <div className="arrow">→</div>

    <div className="step">
        <div className="step-icon">✅</div>
        <p>Issue Resolved</p>
    </div>

    <div className="arrow">→</div>

    <div className="step">
        <div className="step-icon">🔔</div>
        <p>Notification Sent</p>
    </div>

    <div className="arrow">→</div>

    <div className="step">
        <div className="step-icon">🤖</div>
        <p>AI Suggestion</p>
    </div>

    <div className="arrow">→</div>

    <div className="step">
        <div className="step-icon">🌱</div>
        <p>Sustainability Impact</p>
    </div>

    </div>

</div>
    <div className="features-section">

        <div className="feature-card">

    <img
        src="https://cdn-icons-png.flaticon.com/512/1828/1828919.png"
        alt="report"
        className="feature-icon"
    />

    <h3>Report Issues</h3>

    <p>
        Report community issues
        quickly with photo uploads.
    </p>

</div>

<div className="feature-card">

    <img
        src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
        alt="ai"
        className="feature-icon"
    />

    <h3>AI Suggestions</h3>

    <p>
        Get intelligent suggestions
        powered by AI.
    </p>

</div>

<div className="feature-card">

    <img
        src="https://cdn-icons-png.flaticon.com/512/2909/2909768.png"
        alt="sustainability"
        className="feature-icon"
    />

    <h3>Sustainability</h3>

    <p>
        Track eco-friendly initiatives
        and community impact.
    </p>

</div>

    </div>

    <footer className="footer">

    <div className="footer-content">

        <div>
            <h3>Smart Community</h3>
            <p>
                Empowering communities through
                technology and sustainability.
            </p>
        </div>

        <div>
            <h4>Modules</h4>

            <p>Report Issues</p>
            <p>AI Suggestions</p>
            <p>Sustainability</p>
            <p>Notifications</p>
        </div>

        <div>
            <h4>Contact</h4>

            
            <p>Bangalore, India</p>
        </div>

    </div>

    <hr />

    <p className="footer-copy">
        © 2026 Smart Community Management System
    </p>

</footer>

</>

);
}

export default Login;