"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_config_1 = require("../database.config");
const router = (0, express_1.Router)();
/* GET home page. */
router.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, database_config_1.connect)();
        connection.query('SELECT * FROM todo ORDER BY id desc', function (err, rows) {
            if (err) {
                req.flash('error', err);
                res.render('index', { todo: '' });
            }
            else {
                res.render('index', { todo: rows });
            }
        });
    });
});
// ADD NEW USER POST ACTION
router.post('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, database_config_1.connect)();
        req.assert('titolo', 'titolo is required').notEmpty(); //Validate email
        var errors = req.validationErrors();
        if (!errors) { //No errors were found.  Passed Validation!
            var todo = {
                titolo: req.sanitize('titolo').escape().trim(),
                descrizione: req.sanitize('descrizione').escape().trim(),
                stato: "Inserito",
                scadenza: req.sanitize('scadenza').escape().trim(),
            };
            connection.query('INSERT INTO todo SET ?', todo, function (err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err);
                    // render to views/user/add.ejs
                    res.render('index', {
                        todo: todo,
                    });
                }
                else {
                    req.flash('success', 'Todo added successfully!');
                    res.redirect('index');
                }
            });
        }
        else { //Display errors
            var error_msg = '';
            errors.forEach(function (error) {
                error_msg += error.msg + '<br>';
            });
            req.flash('error', error_msg);
            /**
             * Using req.body.titolo
             * because req.param('titolo') is deprecated
             */
            res.render('index', { todo: req.body.todo });
        }
    });
});
// SHOW EDIT todo FORM
router.get('/(:id)', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, database_config_1.connect)();
        connection.query('SELECT * FROM todo WHERE id = ' + req.params.id, function (err, rows, fields) {
            if (err)
                throw err;
            // if todo not found
            if (rows.length <= 0) {
                req.flash('error', 'Customers not found with id = ' + req.params.id);
                res.redirect('/customers');
            }
            else { // if todo found
                res.render('index', {
                    id: rows[0].id,
                    titolo: rows[0].titolo,
                    descrizione: rows[0].descrizione,
                    stato: rows[0].stato,
                    scadenza: rows[0].scadenza
                });
            }
        });
    });
});
// EDIT Todo POST ACTION
router.post('/:id', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        req.assert('titolo', 'Title is required').notEmpty(); //Validate nam           //Validate age
        const connection = yield (0, database_config_1.connect)();
        var errors = req.validationErrors();
        if (!errors) {
            var todo = {
                titolo: req.sanitize('titolo').escape().trim(),
                descrizione: req.sanitize('descrizione').escape().trim(),
                stato: req.sanitize('stato').escape().trim(),
                scadenza: req.sanitize('scadenza').escape().trim(),
            };
            connection.query('UPDATE todo SET ? WHERE id = ' + req.params.id, todo, function (err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err);
                    // render to views/index
                    res.render('index', {
                        id: req.params.id,
                        todo: todo
                    });
                }
                else {
                    req.flash('success', 'Todo updated successfully!');
                    res.redirect('/');
                }
            });
        }
        else { //Display errors to todo
            var error_msg = '';
            errors.forEach(function (error) {
                error_msg += error.msg + '<br>';
            });
            req.flash('error', error_msg);
            /**
             * Using req.body.titolo
             * because req.param('titolo') is deprecated
             */
            res.render('index', {
                id: req.params.id,
                titolo: req.body.titolo,
                descrizione: req.body.descrizione,
                stato: req.body.stato,
                scadenza: req.body.scadenza
            });
        }
    });
});
// DELETE USER
router.get('/(:id)', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var user = { id: req.params.id };
        const connection = yield (0, database_config_1.connect)();
        connection.query('DELETE FROM todo WHERE id = ' + req.params.id, user, function (err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err);
                // redirect to users list page
                res.redirect('/');
            }
            else {
                req.flash('success', 'Todo deleted successfully! id = ' + req.params.id);
                // redirect to users list page
                res.redirect('/');
            }
        });
    });
});
exports.default = router;
