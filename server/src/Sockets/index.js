import socketAuth from "../middlewares/socketAuth";
import { addOnlineUser, removeOnlineUser } from "../libs/onlineUsers";
import { lobbySocketHandler } from "./lobby.socket";

export async function socketInitialize(io) {
    socketAuth(io);
    io.on("connection", (socket) => {
        console.log("a user connected");

        // Add the user to the online users map
        addOnlineUser(socket.userId, socket.id);

        // Handle socket events
        lobbySocketHandler(socket, io);

        // Remove the user from the online users map
        socket.on("disconnect", (reason) => {
            console.log("a user disconnected, reason: ", reason);
            removeOnlineUser(socket.userId);
        })
    })
}