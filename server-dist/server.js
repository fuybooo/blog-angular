"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var wsServer = new ws_1.Server({ port: 8001 });
wsServer.on("connection", function (websocket) {
    websocket.on('message', function (message) {
        console.log('server:', message);
    });
});
