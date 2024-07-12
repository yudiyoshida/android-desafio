import DataSource from '@database/data-source';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

import { Prisma } from '@prisma/client';
import { UserDto } from './dtos/user.dto';

class Service {
  private readonly repository;

  constructor() {
    this.repository = DataSource.user;
  }

  public async findAll(limit: number, page: number) {
    return DataSource.$transaction([
      this.repository.findMany({
        take: limit,
        skip: ((page - 1) * limit),
        select: UserDto,
        orderBy: { name: 'asc' },
      }),
      this.repository.count(),
    ]);
  }

  public async findByIdAllFields(id: number) {
    const user = await this.repository.findUnique({
      where: { id },
    });

    if (!user) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);
    else return user;
  }

  public async findById(id: number) {
    const user = await this.repository.findUnique({
      where: { id },
      select: UserDto,
    });

    if (!user) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);
    else return user;
  }

  public async findByCredential(credential: string) {
    const user = await this.repository.findFirst({
      where: {
        OR: [
          { email: credential },
        ],
      },
    });

    if (!user) throw new AppException(400, ErrorMessages.INVALID_CREDENTIALS);
    else return user;
  }


  public async findByUniqueFields(data: Prisma.UserWhereUniqueInput) {
    return this.repository.findFirst({
      where: {
        OR: [
          { email: data.email },
        ],
      },
    });
  }

  public async create(data: Prisma.UserCreateInput) {
    return this.repository.create({
      data,
      select: UserDto,
    });
  }
}

export default new Service();
