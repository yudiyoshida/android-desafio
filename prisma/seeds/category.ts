import { PrismaClient } from '@prisma/client';

export async function seedCategories(prisma: PrismaClient) {
  for (let i = 1; i <= 5; i++) {
    await prisma.category.create({
      data: {
        title: `Categoria ${i}`,
        imageUrl: 'http://exemplo.com/images/category.png',
      },
    });
  }

  console.log('Categories seed OK.');
}
