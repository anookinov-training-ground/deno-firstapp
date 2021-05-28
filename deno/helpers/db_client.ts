import { MongoClient } from 'https://deno.land/x/mongo/mod.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';

const dotenvConfig = config();

let db: any;

export async function connect() {
  const client = new MongoClient();
  await client.connect(
    `mongodb+srv://${dotenvConfig.MONGO_USER}:${dotenvConfig.MONGO_PASSWORD}@cluster0.yg0pj.mongodb.net/?authMechanism=SCRAM-SHA-1&retryWrites=true&w=majority`
  );
  // await client.connect({
  //   db: dotenvConfig.MONGO_DEFAULT_DATABASE,
  //   tls: true,
  //   servers: [
  //     {
  //       host: 'cluster0.yg0pj.mongodb.net',
  //       port: 27017
  //     }
  //   ],
  //   credential: {
  //     username: Deno.env.get('MONGO_USER'),
  //     password: Deno.env.get('MONGO_PASSWORD'),
  //     db: dotenvConfig.MONGO_DEFAULT_DATABASE,
  //     mechanism: 'SCRAM-SHA-1'
  //   }
  // });

  db = client.database(dotenvConfig.MONGO_DEFAULT_DATABASE);
}

export function getDb() {
  return db;
}
