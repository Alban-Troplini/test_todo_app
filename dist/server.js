"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const todo_routes_1 = __importDefault(require("./routes/todo.routes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3007;
//View engine ejs
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
//parse request of content type app/json
app.use(express_1.default.json());
//parse request of content type app/www-url-encodet
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(todo_routes_1.default);
app.listen(port, () => { console.log(`Server running on port ${port}`); });
