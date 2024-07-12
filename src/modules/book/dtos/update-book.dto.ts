import { z } from 'zod';
import { CreateBook } from './create-book.dto';

export type UpdateBookOutputDto = z.output<typeof UpdateBook>
export const UpdateBook = CreateBook.partial();
