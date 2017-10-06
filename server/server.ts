import {Server} from 'ws';
const wsServer = new Server({port: 8001});
wsServer.on("connection", websocket => {
  websocket.on('message', (message: string) => {
    console.log('server:', message);
  });
});
