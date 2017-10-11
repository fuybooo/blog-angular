{
  let app = require('express')();
  let server = require('http').createServer(app);
  let io = require('socket.io')(server);
  let count = 0;
  const PORT = 3000;
  let clientMap: any = {};
  let getAnother = (client) => {
    if (client._count % 2 === 1) {
      return clientMap[client._count + 1];
    } else {
      return clientMap[client._count - 1];
    }
  };
  let bindListener = (client, event) => client.on(event, (data) => {
    if (data) {
      getAnother(client).emit(event, data);
    } else {
      getAnother(client).emit(event);
    }
  });
  io.on('connection', (client) => {
    // 连接时
    client._count = ++count;
    clientMap[count] = client;
    // if (count % 2 === 1) {
    //   client.emit('waiting', 'Waiting for another person');
    // } else {
    //   client.emit('start');
    //   clientMap[count - 1].emit('start');
    // }
    // 准备
    client.on('ready', () => {
      client._ready = true;
      let another = getAnother(client);
      if (another && another._ready) {
        let data = {type: Math.floor(Math.random() * 7), directive: Math.floor(Math.random() * 4)};
        let nextData = {type: Math.floor(Math.random() * 7), directive: Math.floor(Math.random() * 4)};
        client.emit('start', data);
        another.emit('start', data);
        client.emit('next', nextData);
        another.emit('next', nextData);
      }
    });
    // 初始化
    bindListener(client, 'init');
    bindListener(client, 'down');
    bindListener(client, 'fixed');
    client.on('disconnect', () => {
    });
  });
  server.listen(PORT);
  console.log(`服务已经启动在端口${PORT}`);
}
