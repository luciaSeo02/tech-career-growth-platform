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
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { Patch, Delete } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.usersService.createUser(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@Req() req: Request & { user: { sub: string } }) {
    return this.usersService.getUserById(req.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('me')
  update(
    @Req() req: Request & { user: { sub: string } },
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(req.user.sub, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('me')
  delete(@Req() req: Request & { user: { sub: string } }) {
    return this.usersService.deleteUser(req.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('change-password')
  changePassword(
    @Req() req: Request & { user: { sub: string } },
    @Body() dto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(req.user.sub, dto);
  }

  @Post('forgot-password')
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.usersService.forgotPassword(dto.email);
  }

  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.usersService.resetPassword(dto);
  }
}
