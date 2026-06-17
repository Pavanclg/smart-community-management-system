import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages /Login.jsx";
import Register from "./pages /Register.jsx";
import Dashboard from "./pages /Dashboard.jsx";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AISuggestion from "./pages /AISuggestion.jsx";
import Sustainability from "./pages /Sustainability.jsx";
import Notifications from "./pages /Notifications.jsx";

import Profile from "./pages /Profile.jsx";

function AppContent() {

    const location = useLocation();

    const hideNavbar =
        location.pathname === "/" ||
        location.pathname === "/register";

    return (
        <>

            {!hideNavbar && <Navbar />}

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/ai"
                    element={
                        <ProtectedRoute>
                            <AISuggestion />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/sustainability"
                    element={
                        <ProtectedRoute>
                            <Sustainability />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/notifications"
                    element={
                        <ProtectedRoute>
                            <Notifications />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </>
    );
}

function App() {

    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;