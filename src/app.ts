import { createServer } from "http";
import { Server, Socket } from "socket.io";
import express from 'express';
import path from 'path';

const app = express();
const server = createServer(app);
const public_path = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(public_path + '/index.html');
});

io.on("connection", (socket: Socket) => {
  console.log(`A user has connected with id: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`A user has disconnected with id ${socket.id}`);
    //handleDisconnect(client_id);
  });
});

server.listen(port, () => {
  console.log('listening on port: 3000');
});