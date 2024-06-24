import express from "express";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import cors from "cors";

//🚀
const app = express();
const server = createServer(app);
const io = new Server(server);

//🚀
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

//manage events 🚀🚀
io.on("connection", (socket: Socket) => {
  //
  console.log(`client connected with id : ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("client disconnect");
  });
});

//🚀🚀
server.listen(8000, () => {
  console.log(`Sever running on port ${8000}`);
});
