"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const public_path = path_1.default.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const io = new socket_io_1.Server(server);
app.get('/', (req, res) => {
    res.sendFile(public_path + '/index.html');
});
io.on("connection", (socket) => {
    console.log(`A user has connected with id: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`A user has disconnected with id ${socket.id}`);
        //handleDisconnect(client_id);
    });
});
server.listen(port, () => {
    console.log('listening on port: 3000');
});
// io.on("connection", (socket: Socket) => {
//   console.log(`A user has connected with id: ${socket.id}`);
//   socket.on('disconnect', () => {
//     console.log(`A user has disconnected with id ${socket.id}`);
//     //handleDisconnect(client_id);
//   });
// });
// import express from 'express';
// import { createServer } from "http";
// import { Server, Socket } from "socket.io";
// const app = require("express")();
// const httpServer = require("http").createServer(app);
// const options = { /* ... */ };
// const io = require("socket.io")(httpServer, options);
// io.on("connection", socket => { /* ... */ });
// httpServer.listen(3000);
// WARNING !!! app.listen(3000); will not work here, as it creates a new HTTP server
// const app = express();
// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   // ...
// });
// const port = process.env.PORT || 3000;
// httpServer.listen(port, () => {
//   console.log('listening on port: 3000');
// });
// const server = createServer(app);
// const options = { /*..*/ };
// const io = new Server(server, options);
// const port = process.env.PORT || 3000;
// server.configure(function(){
//     server.use(express.static(__dirname + '../../public'));
// });
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });
// io.on("connection", (socket: Socket) => {
//   console.log("hello");
// });
// const port = process.env.PORT || 3000;
// const server = createServer(app);
// // WHAT DOES THIS DO
// import { fileURLToPath } from 'url';
// import path, { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// app.use('static', express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));
// const io = new Server(server);
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });
// io.on('connection', (socket: Socket) => {
//   console.log(socket.id);
//   socket.on('disconnect', () => {
//     console.log(`A user has disconnected with id ${socket.id}`);
//     //handleDisconnect(client_id);
//   });
// });
// server.listen(port, ()=> {
//   console.log(`Starting server on port ${port}`);
// });
// delee this later-------
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
// app.listen(port, () => {
//   return console.log(`Express is listening at http://localhost:${port}`);
// });
//# sourceMappingURL=app.js.map