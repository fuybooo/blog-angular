{
    var app = require('express')();
    var server = require('http').createServer(app);
    var io = require('socket.io')(server);
    var count_1 = 0;
    var PORT = 8001;
    var socketMap_1 = {};
    io.on('connection', function (client) {
        // 连接时
        client.count = ++count_1;
        socketMap_1[count_1] = client;
        if (count_1 % 2 === 1) {
            client.emit('waiting', 'Waiting for another person');
        }
        else {
            client.emit('start');
            socketMap_1[count_1 - 1].emit('start');
        }
        client.on('disconnect', function () {
        });
    });
    server.listen(PORT);
    console.log("\u670D\u52A1\u5DF2\u7ECF\u542F\u52A8\u5728\u7AEF\u53E3" + PORT);
}
