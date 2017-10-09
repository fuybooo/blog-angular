{
    var app = require('express')();
    var server = require('http').createServer(app);
    var io = require('socket.io')(server);
    var count_1 = 0;
    var PORT = 3000;
    var clientMap_1 = {};
    var getAnother_1 = function (client) {
        if (client._count % 2 === 1) {
            return clientMap_1[client._count + 1];
        }
        else {
            return clientMap_1[client._count - 1];
        }
    };
    io.on('connection', function (client) {
        // 连接时
        client._count = ++count_1;
        clientMap_1[count_1] = client;
        // if (count % 2 === 1) {
        //   client.emit('waiting', 'Waiting for another person');
        // } else {
        //   client.emit('start');
        //   clientMap[count - 1].emit('start');
        // }
        // 准备
        client.on('ready', function () {
            client._ready = true;
            var another = getAnother_1(client);
            if (another && another._ready) {
                var data = { type: Math.floor(Math.random() * 7), directive: Math.floor(Math.random() * 4) };
                client.emit('start', data);
                another.emit('start', data);
            }
        });
        // 初始化
        client.on('init', function (data) {
            getAnother_1(client).emit('init', data);
        });
        client.on('disconnect', function () {
        });
    });
    server.listen(PORT);
    console.log("\u670D\u52A1\u5DF2\u7ECF\u542F\u52A8\u5728\u7AEF\u53E3" + PORT);
}
