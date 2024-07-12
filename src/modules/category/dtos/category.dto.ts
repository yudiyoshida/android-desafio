import { Prisma } from '@prisma/client';

// output
export const CategoryDto = Prisma.validator<Prisma.CategorySelect>()({
  id: true,
  title: true,
  createdAt: true,
  updatedAt: true,
});
