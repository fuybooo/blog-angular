{
    var app = require('express')();
    var server = require('http').createServer(app);
    var io_1 = require('socket.io')(server);
    var count_1 = 0;
    var PORT = 3000;
    io_1.on('connection', function (client) {
        // 连接时
        client.nickName = "user" + ++count_1;
        io_1.emit('enter', { nickName: client.nickName, message: 'come in' });
        client.on('message', function (str) {
            io_1.emit('message', { nickName: client.nickName, message: str });
        });
        client.on('disconnect', function () {
            io_1.emit('leave', { nickName: client.nickName, message: 'left' });
        });
    });
    server.listen(PORT);
    console.log("\u670D\u52A1\u5DF2\u7ECF\u542F\u52A8\u5728\u7AEF\u53E3" + PORT);
}
