import { z } from 'zod';

export type CreateBookOutputDto = z.output<typeof CreateBook>
export const CreateBook = z.object({
  title: z.string().trim().min(1),
  summary: z.string().trim().min(1).optional(),
  author: z.string().trim().min(1),
  imageUrl: z.string().url(),
  categoryId: z.coerce.number().positive().int(),
});
