import { Link } from "react-router-dom";

function Navbar() {

    const token = localStorage.getItem("token");

    const logoutUser = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        window.location.href = "/";
    };

    return (

        <nav
            style={{
                background: "#2c3e50",
                padding: "15px",
                display: "flex",
                gap: "20px"
            }}
        >

            {!token && (
                <Link
                    to="/"
                    style={{ color: "white", textDecoration: "none" }}
                >
                    Login
                </Link>
            )}

            {!token && (
                <Link
                    to="/register"
                    style={{ color: "white", textDecoration: "none" }}
                >
                    Register
                </Link>
            )}

            {token && (
                <Link
                    to="/dashboard"
                    style={{ color: "white", textDecoration: "none" }}
                >
                    Dashboard
                </Link>
            )}

            {token && (
                <Link
                    to="/ai"
                    style={{ color: "white", textDecoration: "none" }}
                >
                    AI Suggestion
                </Link>
            )}

            {token && (
                <Link
                    to="/sustainability"
                    style={{ color: "white", textDecoration: "none" }}
                >
                    Sustainability
                </Link>
            )}

            {token && (
                <button
                    onClick={logoutUser}
                    style={{
                        background: "crimson",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        cursor: "pointer"
                    }}
                >
                    Logout
                </button>
            )}

        </nav>
    );
}

export default Navbar;