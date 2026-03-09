import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: { name?: string; email: string; password: string }) {
    const hashedPassword: string = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        name: data.name ?? null,
        email: data.email,
        password: hashedPassword,
      },
    });
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async updateUser(id: string, data: { name?: string; email?: string }) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
