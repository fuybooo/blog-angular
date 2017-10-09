{
  let app = require('express')();
  let server = require('http').createServer(app);
  let io = require('socket.io')(server);
  let count = 0;
  const PORT = 3000;
  let socketMap: any = {};
  io.on('connection', (client) => {
    // 连接时
    client.count = ++count;
    socketMap[count] = client;
    if (count % 2 === 1) {
      client.emit('waiting', 'Waiting for another person');
    } else {
      client.emit('start');
      socketMap[count - 1].emit('start');
    }
    client.on('disconnect', () => {
    });
  });
  server.listen(PORT);
  console.log(`服务已经启动在端口${PORT}`);
}
