import express, {Express} from 'express';
import bodyparser from 'body-parser';
import path from 'path';

import TodoRoute from './routes/todo.routes'

const app: Express = express();
const port: string | number = process.env.PORT || 3007;

    //View engine ejs
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static(path.join(__dirname, 'public')));
    //parse request of content type app/json
    app.use(express.json());
    //parse request of content type app/www-url-encodet
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true}));
    app.use(TodoRoute);

app.listen(port, () => { console.log(`Server running on port ${port}` )});
