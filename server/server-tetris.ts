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
    let another = getAnother(client);
    if (another) {
      if (data) {
        another.emit(event, data);
      } else {
        another.emit(event);
      }
    } else {
      client.emit('leave');
    }
  });
  io.on('connection', (client) => {
    // 连接时
    client._count = ++count;
    clientMap[count] = client;
    // 准备
    client.on('ready', () => {
      client._ready = true;
      let another = getAnother(client);
      if (another && another._ready) {
        client.emit('start');
        another.emit('start');
      }
    });
    // 初始化
    bindListener(client, 'next');
    bindListener(client, 'current');
    bindListener(client, 'setData');
    bindListener(client, 'down');
    bindListener(client, 'checkClear');
    bindListener(client, 'checkGameOver');
    bindListener(client, 'preformNext');
    bindListener(client, 'left');
    bindListener(client, 'right');
    bindListener(client, 'rotate');
    bindListener(client, 'fall');
    bindListener(client, 'addLine');
    client.on('disconnect', () => {
    });
  });
  server.listen(PORT);
  console.log(`服务已经启动在端口${PORT}`);
}
