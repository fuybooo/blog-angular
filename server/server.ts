let app = require('express')();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let count = 0;
const PORT = 8001;
io.on('connection', (client) => {
  // 连接时
  client.nickName = `user${++count}`;
  io.emit('enter', {nickName: client.nickName, message: 'come in'});
  client.on('message', (str) => {
    io.emit('message', {nickName: client.nickName, message: str});
  });
  client.on('disconnect', () => {
    io.emit('leave', {nickName: client.nickName, message: 'left'});
  });
});
server.listen(PORT);
console.log(`服务已经启动在端口${PORT}`);
