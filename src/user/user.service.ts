import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/upadate-user.dto';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class UserService {
  USER_ID_KEY = 'split_id';
  constructor(private readonly prisma: PrismaService) {}
  async createUser(userDto: CreateUserDto, res: Response): Promise<IUser> {
    const user = await this.prisma.user.create({
      data: userDto,
    });

    this.setUserIdToResponse(res, user.id);

    return user;
  }

  async getUser(userId: string): Promise<IUser> {
    if (!userId) {
      throw new BadRequestException();
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    if (!userId) {
      throw new BadRequestException();
    }

    return await this.prisma.user.update({
      where: { id: userId },
      data: updateUserDto,
    });
  }

  async removeUser(userId: string): Promise<IUser> {
    return await this.prisma.user.delete({
      where: { id: userId },
    });
  }

  private setUserIdToResponse(res: Response, userId: string) {
    res.cookie(this.USER_ID_KEY, userId, {
      httpOnly: true,
      domain: 'localhost',
      secure: true,
      sameSite: 'none',
    });
  }
}
