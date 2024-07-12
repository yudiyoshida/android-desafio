import { z } from 'zod';

export type CreateBookOutputDto = z.output<typeof CreateBook>
export const CreateBook = z.object({
  title: z.string().trim().min(1),
  author: z.string().trim().min(1),
  imageUrl: z.string().url(),
  categoryId: z.coerce.number().positive().int(),
  summary: z.string().trim().min(1).optional(),
  content: z.string().trim().min(1),
  contentAudio: z.string().trim(),
  explanation: z.string().trim().min(1),
  explanationAudio: z.string().trim().optional(),
});
