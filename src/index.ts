import express from "express";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { PORT } from "./config";

//🚀
const app = express();
app.use(express.json());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  },
});

//🚀
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

interface ISocket {
  id: string;
  message: string;
}

//midds
io.use((socket, next) => {
  next();
});

//manage events 🚀🚀
io.on("connection", (socket: Socket) => {
  //
  console.log(`client connected with id : ${socket.id}`);

  //
  socket.on("message", (data) => {
    io.emit("new-message", data);
  });

  socket.on("send-message", (data: any) => {
    const { id, message } = JSON.parse(data) as ISocket;
    //id = { id , roomName }
    console.log(message);
    //socket.broadcast.emit("new-message", id);
    //io.to(id).emit("new-message", message);
    socket.to(id).emit("new-message", message);
  });

  socket.on("join-room", (roomName: string) => {
    //
    console.log(`User id = ${socket.id} ,joined ${roomName} room`);
    socket.join(roomName);
  });

  socket.on("leave-room", (roomName: string) => {
    socket.leave(roomName);
  });

  socket.on("disconnect", () => {
    console.log("client disconnect");
  });
});

//🚀🚀
server.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`);
});
