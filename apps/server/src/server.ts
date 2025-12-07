import { serve } from 'bun';
import { db } from './db';
import { notes, users } from './db/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';

const server = serve({
  port: 5000,
  fetch(req) {
    console.log('method:', req.method);
    const origin = req.headers.get('Origin') || '*';
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    return Response.json(
      { ok: true },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  },
  routes: {
    '/': new Response('Api page #Noti.'),

    // users routes
    '/api/users': async (req) => {
      const all = await db.select().from(users);
      return Response.json(all);
    },
    '/api/users/register': {
      async POST(req) {
        const body = '';
        return Response.json({
          ok: true,
        });
      },
    },
    '/api/users/me': async (req) => {
      return Response.json({});
    },
    '/api/users/:id': async (req) => {
      const id = req.params.id;
      const usersById = await db.select().from(users).where(eq(notes.id, id));
      return Response.json(usersById);
    },
    '/api/users/update/:id': {
      async PUT(req) {
        const id = req.params.id;
        return Response.json({});
      },
    },

    // notes routes
    '/api/notes': async (req) => {
      const all = await db.select().from(notes);
      return Response.json(all);
    },
    '/api/notes/create': {
      async POST(req) {
        const body = (await req.json()) as { title: string; content: string };
        const newNotes = await db.insert(notes).values({
          id: uuid(),
          title: body.title,
          content: body.content,
        });
        return Response.json(newNotes);
      },
    },
    '/api/notes/:id': async (req) => {
      const id = req.params.id;
      return Response.json({
        id,
      });
    },
    '/api/notes/update/:id': {
      async PUT(req) {
        const id = req.params.id;
        return Response.json({});
      },
    },
  },
});

console.log(`Api run on http://localhost:${server.port}`);
