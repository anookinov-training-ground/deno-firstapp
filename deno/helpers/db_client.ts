import { MongoClient } from 'https://deno.land/x/mongo/mod.ts';

let db: any;

export async function connect() {
  const client = new MongoClient();
  // await client.connect(
  //   `mongodb+srv://${Deno.env.get('MONGO_USER')}:${Deno.env.get(
  //     'MONGO_PASSWORD'
  //   )}@cluster0.yg0pj.mongodb.net/?retryWrites=true&w=majority`
  // );
  await client.connect({
    db: 'todo-app',
    tls: true,
    servers: [
      {
        // host: 'mongodb-srv://cluster0.yg0pj.mongodb.net',
        host: 'cluster0-shard-00-02.yg0pj.mongodb.net',
        port: 27017
      }
    ],
    credential: {
      username: Deno.env.get('MONGO_USER'),
      password: Deno.env.get('MONGO_PASSWORD'),
      db: 'todo-app',
      mechanism: 'SCRAM-SHA-1'
    }
  });

  db = client.database('todo-app');
}

export function getDb() {
  return db;
}
