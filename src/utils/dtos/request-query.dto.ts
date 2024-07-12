import { z } from 'zod';

export type RequestQueryOutputDto = z.output<typeof RequestQuery>
export const RequestQuery = z.object({
  limit: z.coerce.number().positive().int().optional(),
  page: z.coerce.number().positive().int().optional(),
  categoryId: z.coerce.number().positive().int().optional(),
  search: z.string().trim().optional(),
});
