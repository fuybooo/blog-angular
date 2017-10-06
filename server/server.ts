import {Server} from 'ws';
const PORT = 8001;
const wsServer = new Server({port: PORT});
wsServer.on("connection", websocket => {
  websocket.on('message', (message: string) => {
    console.log('server:', message);
    websocket.send('data form server');
  });
});
console.log(`websocket run at port ${PORT}`);
