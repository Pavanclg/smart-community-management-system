import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Navbar() {

    const token = localStorage.getItem("token");
    const [notificationCount, setNotificationCount] = useState(0);

useEffect(() => {

    fetchNotificationCount();

    const interval = setInterval(() => {
        fetchNotificationCount();
    }, 100);

    return () => clearInterval(interval);

}, []);

const fetchNotificationCount = async () => {

    try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
            "https://smart-community-management-system.onrender.com/api/notifications/count",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setNotificationCount(res.data.count);

    } catch (error) {

        console.log(error);

    }
};
    const logoutUser = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        window.location.href = "/";
    };

    return (

    <nav className="navbar">

        <div className="logo">
  <span>🏘️</span>
  <h2>Smart Community</h2>
</div>

        <div className="navbar-links">

            {!token && (
                <Link to="/" className="nav-link">
                    Login
                </Link>
            )}

            {!token && (
                <Link to="/register" className="nav-link">
                    Register
                </Link>
            )}

            {token && (
                <Link to="/dashboard" className="nav-link">
                    Dashboard
                </Link>
            )}

            {token && (
                <Link to="/ai" className="nav-link">
                    AI Suggestions
                </Link>
            )}

            {token && (
                <Link to="/profile" className="nav-link">
                    Profile
                </Link>
            )}

            {token && (
                <Link to="/sustainability" className="nav-link">
                    Sustainability
                </Link>
            )}

            {token && (
                <Link
                    to="/notifications"
                    className="nav-link notification-link"
                >
                    Notifications

                    {notificationCount > 0 && (
                        <span className="notification-count">
                            {notificationCount}
                        </span>
                    )}
                </Link>
            )}

        </div>

        {token && (
            <button
                onClick={logoutUser}
                className="nav-logout"
            >
                Logout
            </button>
        )}

    </nav>
    

);

}

export default Navbar;