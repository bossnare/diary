import { serve } from 'bun';
import { db } from './db';
import { notes, users } from './db/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';

const server = serve({
  port: 5000,
  routes: {
    '/': new Response('Api page #Onlinotes.'),

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
      return Response.json({});
    },
    '/api/notes/create': {
      async PUT(req) {
        const body = '';
        await db.insert(notes).values({
          id: uuid(),
          title: '',
          content: '',
        });
        return Response.json({});
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
