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
    var bindListener_1 = function (client, event) { return client.on(event, function (data) {
        if (data) {
            getAnother_1(client).emit(event, data);
        }
        else {
            getAnother_1(client).emit(event);
        }
    }); };
    io.on('connection', function (client) {
        // 连接时
        client._count = ++count_1;
        clientMap_1[count_1] = client;
        // 准备
        client.on('ready', function () {
            client._ready = true;
            var another = getAnother_1(client);
            if (another && another._ready) {
                client.emit('start');
                another.emit('start');
            }
        });
        // 初始化
        bindListener_1(client, 'next');
        bindListener_1(client, 'current');
        bindListener_1(client, 'setData');
        bindListener_1(client, 'down');
        bindListener_1(client, 'checkClear');
        bindListener_1(client, 'checkGameOver');
        bindListener_1(client, 'preformNext');
        bindListener_1(client, 'left');
        bindListener_1(client, 'right');
        bindListener_1(client, 'rotate');
        bindListener_1(client, 'fall');
        bindListener_1(client, 'addLine');
        client.on('disconnect', function () {
        });
    });
    server.listen(PORT);
    console.log("\u670D\u52A1\u5DF2\u7ECF\u542F\u52A8\u5728\u7AEF\u53E3" + PORT);
}
