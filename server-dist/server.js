"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var PORT = 8001;
var wsServer = new ws_1.Server({ port: PORT });
wsServer.on("connection", function (websocket) {
    websocket.on('message', function (message) {
        console.log('server:', message);
        websocket.send('data form server');
    });
});
console.log("websocket run at port " + PORT);
