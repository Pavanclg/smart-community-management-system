import { io } from "socket.io-client";

const socket = io("https://smart-community-management-system.onrender.com", {
    autoConnect: false,
});

export default socket;
