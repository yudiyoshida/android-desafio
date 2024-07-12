import DataSource from '@database/data-source';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

import { Prisma } from '@prisma/client';
import { BookDto } from './dtos/book.dto';

class Service {
  private readonly repository;

  constructor() {
    this.repository = DataSource.book;
  }

  public async findAll(limit: number, page: number, userId: number, categoryId?: number, search?: string) {
    return DataSource.$transaction([
      this.repository.findMany({
        where: {
          userId,
          categoryId,
          OR: [
            { title: { contains: search } },
            { author: { contains: search } },
          ],
        },
        take: limit,
        skip: ((page - 1) * limit),
        select: BookDto,
        orderBy: { title: 'asc' },
      }),
      this.repository.count({
        where: {
          userId,
          categoryId,
          OR: [
            { title: { contains: search } },
            { author: { contains: search } },
          ],
        },
      }),
    ]);
  }

  public async findById(id: number, userId: number) {
    const book = await this.repository.findFirst({
      where: { id, userId },
      select: BookDto,
    });

    if (!book) throw new AppException(404, ErrorMessages.BOOK_NOT_FOUND);
    else return book;
  }

  public async create(data: Prisma.BookUncheckedCreateInput) {
    return this.repository.create({
      data,
      select: BookDto,
    });
  }

  public async delete(id: number) {
    return this.repository.delete({
      where: { id },
    });
  }
}

export default new Service();
