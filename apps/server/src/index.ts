import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { db } from './db';
import { notes, users } from './db/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';

const app = new Elysia()
  .use(
    cors({
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      // allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
      // maxAge: 3600
    })
  )
  .get('/', () => 'Hello Elysia --powered by bun server')
  .get('/api/users', async () => {
    const all = await db.select().from(users);
    return Response.json(all);
  })
  .get('/api/notes', async () => {
    const all = await db.select().from(notes);
    return Response.json(all);
  })
  .listen(5000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
