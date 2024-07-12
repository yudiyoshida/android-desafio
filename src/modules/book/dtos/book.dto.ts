import { Prisma } from '@prisma/client';

// output
export const BookDto = Prisma.validator<Prisma.BookSelect>()({
  id: true,
  title: true,
  summary: true,
  author: true,
  imageUrl: true,
  createdAt: true,
  updatedAt: true,
  category: true,
});
