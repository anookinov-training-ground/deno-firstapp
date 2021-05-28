import { Router } from 'https://deno.land/x/oak/mod.ts';
import { Bson } from 'https://deno.land/x/mongo/mod.ts';

import { getDb } from '../helpers/db_client.ts';

const router = new Router();

interface Todo {
  id?: string;
  text: string;
}

interface TodoSchema {
  _id: { $oid: string };
  text: string;
}

// let todos: Todo[] = [];

router.get('/todos', async (ctx) => {
  const todos = await getDb().collection('todos').find(); // { _id: ObjectId(), text: '...' }[]
  const transformedTodos = todos.map((todo: TodoSchema) => {
    return { id: todo._id.$oid, text: todo.text };
  });
  ctx.response.body = { todos: transformedTodos };
});

router.post('/todos', async (ctx) => {
  const result = ctx.request.body();
  const data = await result.value;
  const newTodo: Todo = {
    // id: new Date().toISOString(),
    text: data.text
  };

  const id = await getDb().collection('todos').insertOne(newTodo);

  newTodo.id = id.$oid;

  // todos.push(newTodo);

  ctx.response.body = { message: 'Created todo!', todo: newTodo };
});

router.put('/todos/:todoId', async (ctx) => {
  const tid = ctx.params.todoId!;
  const data = await ctx.request.body().value;

  await getDb()
    .collection('todos')
    .updateOne({ _id: new Bson.ObjectId(tid) }, { $set: { text: data.text } });

  // const todoIndex = todos.findIndex((todo) => {
  //   return todo.id === tid;
  // });
  // todos[todoIndex] = { id: todos[todoIndex].id, text: data.text };
  ctx.response.body = { message: 'Updated todo' };
});

router.delete('/todos/:todoId', async (ctx) => {
  const tid = ctx.params.todoId!;

  await getDb()
    .collection('todos')
    .deleteOne({ _id: new Bson.ObjectId(tid) });

  // todos = todos.filter((todo) => todo.id !== tid);
  ctx.response.body = { message: 'Deleted todo' };
});

export default router;
