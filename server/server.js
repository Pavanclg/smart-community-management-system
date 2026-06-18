const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const issueRoutes = require("./routes/issueRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const sustainabilityRoutes =
require("./routes/sustainabilityRoutes");
const statsRoutes = require("./routes/statsRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/notifications", notificationRoutes);
app.use(
    "/api/sustainability",
    sustainabilityRoutes
);
app.use("/api/stats", statsRoutes);

const getStats = async () => {
    const Issue = require("./models/Issue");
    const Sustainability = require("./models/Sustainability");
    const SuggestionLog = require("./models/SuggestionLog");

    const totalIssues = await Issue.countDocuments();
    const resolvedIssues = await Issue.countDocuments({ status: "Resolved" });
    const pendingIssues = await Issue.countDocuments({ status: "Pending" });
    const sustainabilityDrives = await Sustainability.countDocuments();
    const aiSuggestions = await SuggestionLog.countDocuments();

    return {
        issuesReported: totalIssues,
        residentsHelped: resolvedIssues,
        pendingIssues,
        aiSuggestions,
        sustainabilityDrives,
    };
};

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

app.set("io", io);
app.set("getStats", getStats);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected YESSSS");
})
.catch((err) => {
    console.log("Mongo Error:", err.message);
});

app.get("/", (req, res) => {
    res.send("API Running Successfully");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
