const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require('cors');

const users = require("./users");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);
app.use(cors());

io.on("connect", socket => {
  socket.on("join", ({ name, room }, callback) => {
    const { user, error } = users.addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `${user.name} joined room ${user.room}`
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} joined the room` });
    socket.join(user.room);
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: users.getUsersInRoom(user.room)
    });

    callback();
  });

  socket.on("recentRooms", (callback) => {
    const rooms = users.getRecentRooms();
    const data = rooms.map(room => {
      return {
        users: users.getUsersInRoom(room),
        room
      };
    });
    callback(data);
  });

  socket.on("sendMessage", (message, callback) => {
    const user = users.getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    console.log("User has just dissconected!");
    const user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} left the chat`
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: users.getUsersInRoom(user.room)
      });
    }
  });
});

app.use(router);

server.listen(PORT, () => console.log(`SERVER STARTED ON ${PORT}`));
