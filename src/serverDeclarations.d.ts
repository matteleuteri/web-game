declare module 'socket.io';
interface ImportMeta {
    __dirname: string;
}
interface SocketIDMap {
    [index: string]: Player; 
}
interface Player {
    name: string;
    xPos: number;
    yPos: number;
    speed: number;
    direction: number;
    bounces: number;
}