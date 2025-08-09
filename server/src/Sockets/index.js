import socketAuth from "../middlewares/socketAuth";

export async function socketInitialize(io) {
    socketAuth(io);
    io.on("connection", (socket) => {
        console.log("a user connected");
    })
}