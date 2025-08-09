import socketAuth from "../middlewares/socketAuth";
import { addOnlineUser, removeOnlineUser } from "../libs/onlineUsers";

export async function socketInitialize(io) {
    socketAuth(io);
    io.on("connection", (socket) => {
        console.log("a user connected");
        addOnlineUser(socket.userId, socket.id);
    })

    socket.on("disconnect", (reason) => {
        console.log("a user disconnected, reason: ", reason);
        removeOnlineUser(socket.userId);
    })
}