let io;

const initializeSocket = (server) => {

    const { Server } = require("socket.io");

    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"]
        }
    });


    io.on("connection", (socket) => {

        console.log("Admin connected:", socket.id);


        socket.on("disconnect", () => {

            console.log("Admin disconnected:", socket.id);

        });

    });

};


const getIO = () => {

    if (!io) {
        throw new Error("Socket.IO not initialized");
    }

    return io;

};


module.exports = {
    initializeSocket,
    getIO
};