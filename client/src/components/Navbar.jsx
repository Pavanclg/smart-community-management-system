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

            <Link
                to="/"
                style={{ color: "white", textDecoration: "none" }}
            >
                Login
            </Link>

            <Link
                to="/register"
                style={{ color: "white", textDecoration: "none" }}
            >
                Register
            </Link>

            {
                token && (

                    <Link
                        to="/dashboard"
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        Dashboard
                    </Link>
                )
            }

            {
                token && (

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
                )
            }

        </nav>
    );
}

export default Navbar;