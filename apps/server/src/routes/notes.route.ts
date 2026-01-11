import Elysia, { t } from 'elysia';
import { NotesService } from '@/services/notes.service';
import { UsersService } from '@/services/users.service';

export const notesRoute = new Elysia({
  prefix: '/notes',
})
  .get('/', async ({ set, headers, query }) => {
    const token = headers.authorization?.split(' ')[1] as string;
    if (!token) throw new Error('Unauthorized');

    const { id } = await UsersService.getUserFromToken(token);
    const { data, count } = await NotesService.getMyAll(id, query);
    set.status = 200;

    return {
      success: true,
      timestamp: Date.now(),
      count,
      data,
    };
  })
  .get('/:id', async ({ params, set }) => {
    const data = await NotesService.getById(params.id);

    set.status = 200;

    return {
      success: true,
      timestamp: Date.now(),
      data,
    };
  })
  .post(
    '/create',
    async ({ body, set, headers }) => {
      const token = headers.authorization?.split(' ')[1] as string;
      const { id: userId } = await UsersService.getUserFromToken(token);

      const note = await NotesService.create(body, userId);
      set.status = 201;

      return {
        success: true,
        timestamp: Date.now(),
        data: note,
      };
    },
    {
      body: t.Object({
        title: t.String(),
        content: t.String(),
      }),
    }
  )
  .put(
    '/update/:id',
    async ({ params, set, body }) => {
      const data = await NotesService.update(body, params.id);

      set.status = 200;

      return {
        success: true,
        timestamp: Date.now(),
        data,
      };
    },
    {
      body: t.Object({
        title: t.String(),
        content: t.String(),
      }),
    }
  );
