
import { Router, Request, Response } from "express";
const router = Router();
import connection from "../database.config";
import { body, check, param, validationResult } from 'express-validator';

    
//get all todo's from db.
router.get('/', function(req: Request, res: Response) {
   
        connection.query('SELECT * FROM todo ORDER BY id DESC', function(err: any, rows: any) {
 
        if(err){ 
            
            res.render('index', {todo:''});   
        }else{
            res.render('index', {todo: rows});
            //console.log(rows);
        }       
    });
    });

    //*********************************************** */

    //post todo into database.
router.post('/', function(req: any, res: any) {

    // body('titolo', 'Inserisci il titolo').isLength({max: 100}).notEmpty() //Validate titolo, max 100character
    // body('descrizione', 'Inserisci il descrizione').isLength({max: 500}).notEmpty()  //Validate descrizione, max 500character
    // body('scadenza', 'Imposta la scadenza').notEmpty()  //Validate date
  
    // var errors = validationResult(req);
    var titolo = req.body.titolo;
     
    if( titolo ) {           
     
        var todo = {
            titolo: req.body.titolo,
            descrizione: req.body.descrizione,
            stato: req.body.stato,
            scadenza: req.body.scadenza
        }
         
     connection.query('INSERT INTO todo SET ?', todo)
           
        res.redirect('/');
        console.log("Todo saved.");
    }
    else {
        res.redirect('/');
    }
})

//************************************************** */


router.get('/delete/(:id)', function(req: Request, res: Response) {
   
     
    connection.query('DELETE FROM todo WHERE id = ' + req.params.id, function(err, result) {
                
                if (err) {
                    res.redirect('/')
                    console.log("Todo can't be deleted.")
                } else {
                    res.redirect('/')
                    console.log("Todo deleted.")
                }
            })
})
//*********************************************************** */


//SHOW UPDATE TODO FORM
router.get('/update/:id', function(req, res, next){
   

    connection.query('SELECT * FROM todo WHERE id = ' + req.params.id, function(err, rows, fields) {
                if(err) throw err
                 
                if (rows.length <= 0) {
                    
                    res.redirect('/')
                    
                }
                else { // if todo found
                    
                    res.render('update', {
                        id: req.params.id,
                        titolo: rows[0].titolo,
                        descrizione: rows[0].descrizione, 
                        stato: rows[0].stato,
                        scadenza: rows[0].scadenza                   
                    })
                }            
            })
      
    })
     
    // EDIT TODO POST ACTION
    router.post('/update/:id', function(req, res, next) {
       
        var todo = {
            id: req.params.id,
            titolo: req.body.titolo,
            descrizione: req.body.descrizione,
            stato: req.body.stato,
            scadenza: req.body.scadenza
        }

        if( todo.titolo.length > 0 ) {   
     
           
             
    connection.query('UPDATE todo SET ? WHERE id = ' + todo.id, todo, function(err, result) {
                   
                    if (err) {

                        res.render('update/:id', {
                            titolo: req.body.titolo,
                            descrizione: req.body.descrizione,
                            stato: req.body.stato,
                            scadenza: req.body.scadenza
                        })
                        console.log("Todo didn't updated!");
                    } else {
                        res.redirect('/');
                        console.log("Todo updated successfully!");
                    }
                })
             
        }
        else {  
             
            res.render('/', {
                id: req.params.id,
                titolo: req.body.titolo,
                descrizione: req.body.descrizione,
                stato: req.body.stato,
                scadenza: req.body.scadenza
            })
        }
    })

// router.post('/', createTodo);

// router.route('/:todoId')
// .get(getTodoId)
// .delete(deleteTodo)
// .put(updateTodo);

export default router;