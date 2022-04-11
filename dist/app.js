"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
//import path from 'path';
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
//const public_path = path.join(__dirname, "public/");
const port = process.env.PORT || 3000;
const io = new socket_io_1.Server(server);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/../index.html');
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
//# sourceMappingURL=app.js.map