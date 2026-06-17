import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {

    const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {

        e.preventDefault();

        setError("");

        if (!name || !email || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (name.length < 3) {
            setError("Name must be at least 3 characters");
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

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {

            await axios.post(
                "https://smart-community-management-system.onrender.com/api/auth/register",
                {
                    name,
                    email,
                    password
                }
            );

            setLoading(false);

            toast.success("Registration Successful");

            navigate("/");

        } catch (error) {

            setLoading(false);

            toast.error("Registration Failed");
        }
    };

    return (

        <div className="register-page">

            <div className="register-container">

                <h1>Register</h1>

                {
                    error && (
                        <p className="error-text">
                            {error}
                        </p>
                    )
                }

                <form onSubmit={handleRegister}>

                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

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

                   <div className="password-box">

    <input
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
    />

    <span
        className="eye-icon"
        onClick={() =>
            setShowConfirmPassword(!showConfirmPassword)
        }
    >
        {showConfirmPassword ? "🙈" : "👁️"}
    </span>

</div>

                    <button type="submit">

                        {
                            loading
                            ? "Registering..."
                            : "Register"
                        }

                    </button>

                    <p className="login-link">

                        Already have an account?

                        <Link to="/">
                            Login
                        </Link>

                    </p>

                </form>

            </div>

        </div>
    );
}

export default Register;