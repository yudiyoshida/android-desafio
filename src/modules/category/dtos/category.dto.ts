import { Prisma } from '@prisma/client';

// output
export const CategoryDto = Prisma.validator<Prisma.CategorySelect>()({
  id: true,
  title: true,
  imageUrl: true,
  createdAt: true,
  updatedAt: true,
});
