"use strict";
// import {Request, Response} from 'express';
// import {connect} from '../database.config';
// import { ITodo } from '../interface/ITodo';
// export async function getTodos(req: Request, res: Response): Promise<Response> {
//     const conn = await connect();
//     const todos = await conn.query(`SELECT * FROM todo`);
//     return res.json(todos[0])
// }
// export async function createTodo(req: Request, res: Response) {
//     const newTodo: ITodo = req.body;
//     const conn = await connect();
//     await conn.query(`INSERT INTO todo SET ?`, [newTodo])
//     return res.json({ message: 'Todo added successfully' });
// }
// export async function getTodoId(req: Request, res: Response): Promise<Response> {
//     const id = req.params.todoId;
//     const conn = await connect();
//     const todo = await conn.query(`SELECT * FROM todo WHERE id = ?`, [id]);
//     return res.json(todo[0]);
// }
// export async function deleteTodo(req: Request, res: Response) {
//     const id = req.params.todoId;
//     const conn = await connect();
//     await conn.query(`DELETE FROM todo WHERE id = ?`,[id]);
//     return res.json({ message: 'Todo Deleted.'})
// }
// export async function updateTodo(req: Request, res: Response) {
//     const id = req.params.todoId;
//     const updatedTodo: ITodo = req.body;
//     const conn = await connect();
//     await conn.query(`UPDATE todo set ? WHERE id = ?`, [updatedTodo, id]);
//     return res.json( {message: 'Todo Updated succsessfully'});
// }
