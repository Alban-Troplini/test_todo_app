import { createConnection } from 'mysql';


    const connection = createConnection({
        host: 'localhost',
        user: 'root',
        database: 'todo_app',
        password: ''
    });

    connection.connect(function(error){
        if(!!error){
          console.log(error);
        }
      });  
     export default connection; 
