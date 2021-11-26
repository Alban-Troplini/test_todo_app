"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
const connection = (0, mysql_1.createConnection)({
    host: 'localhost',
    user: 'root',
    database: 'todo_app',
    password: ''
});
connection.connect(function (error) {
    if (!!error) {
        console.log(error);
    }
});
exports.default = connection;
