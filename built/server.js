"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
// const io = new Server(httpServer);
const io = new socket_io_1.Server(httpServer, {
    transports: ["websocket", "polling"],
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    },
    allowEIO3: true,
});
// import { updateConfiguration, collide } from '../public/js/PlayersConfiguration.js';
// import { getHighScores } from './scoreReader.js';
// import { Socket } from "socket.io-client"// for the typedef
let num_players = 0;
// let players: SocketIDMap = {};
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
console.log(__dirname);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.use(express_1.default.static(path.join(__dirname, '/public')));
io.on('connection', (socket) => {
    let client_id = socket.id;
    console.log(`A user just connected with id ${client_id}.`);
    //players[client_id] = {name: '', xPos: 100, yPos: 100, speed: 2, direction: 0, bounces: 0};
    //socket.emit('createPlayerProfile', client_id);
    num_players++;
    console.log(`num players: ${num_players}`);
    // socket.on('update_dir', (new_dir_data) => {
    // 	let to_update = players[new_dir_data.id];
    // 	to_update.direction = new_dir_data.new_dir;
    // });
    // socket.on('setName', (nameData) => {
    // 	for(let p in players) {
    // 		if(p === nameData.player_id)
    // 			players[p].name = nameData.nickname;
    // 	}
    // });
    socket.on('disconnect', () => {
        console.log(`A user has disconnected with id ${client_id}`);
        // num_players--;
        // delete players[client_id];
    });
});
// app.get('/js', (req, res) => {
//     res.sendFile(__dirname + '/public/js');
// });
// app.get('/', (req, res) => {public
//     res.sendFile(__dirname + '/public/app.js');
// });
// update state continuously
// setInterval(function() {
// let player_data = {players: players, player_count: num_players};
// io.sockets.emit('state', player_data);
// collide(players);
// for(let p in players)
// 	updateConfiguration(players[p]);
// io.sockets.emit('updatePlayerList', players);
//let highScores = getHighScores('server/scores.txt', players);
// }, 1000 / 60);
httpServer.listen(port, () => {
    console.log(`Starting server on port ${port}`);
});
//# sourceMappingURL=server.js.map