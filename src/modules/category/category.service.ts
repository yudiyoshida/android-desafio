import DataSource from '@database/data-source';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

import { CategoryDto } from './dtos/category.dto';

class Service {
  private readonly repository;

  constructor() {
    this.repository = DataSource.category;
  }

  public async findAll(limit: number, page: number) {
    return DataSource.$transaction([
      this.repository.findMany({
        take: limit,
        skip: ((page - 1) * limit),
        select: CategoryDto,
        orderBy: { title: 'asc' },
      }),
      this.repository.count(),
    ]);
  }

  public async findById(id: number) {
    const category = await this.repository.findUnique({
      where: { id },
      select: CategoryDto,
    });

    if (!category) throw new AppException(404, ErrorMessages.CATEGORY_NOT_FOUND);
    else return category;
  }
}

export default new Service();
