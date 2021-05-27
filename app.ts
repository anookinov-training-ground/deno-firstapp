import { Application } from 'https://deno.land/x/oak/mod.ts';

const app = new Application();

app.use((ctx) => {
  ctx.response.body = 'Hello World!';
});

await app.listen({ port: 8000 });

// import { serve } from 'https://deno.land/std/http/server.ts';

// const server = serve({ port: 3000 });

// for await (const req of server) {
//   req.respond({ body: 'Hello World\n' });
// }

// const text = 'This is a test - and it should be stored in a file!';

// const encoder = new TextEncoder();
// const data = encoder.encode(text);

// Deno.writeFile('message.txt', data).then(() => {
//   console.log('Wrote to file!');
// });

// let message: string;

// message = 'Hi there!';

// console.log(message);
