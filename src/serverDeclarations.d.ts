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
interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}