import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async register(
    @Body() body: { name: string; email: string; password: string },
  ) {
    return this.usersService.createUser(body);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req: Request & { user: { sub: string; email: string } }) {
    return req.user;
  }

  @Get()
  async findAll() {
    return this.usersService.getUsers();
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }
}
