import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateDto } from './dto/create-dto';
import { UpdateDto } from './dto/update-dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUser(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  @Post()
  createUser(@Body() dto: CreateDto): Promise<User> {
    return this.usersService.create(dto);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() dto: UpdateDto): Promise<User> {
    return this.usersService.update(id, dto);
  }
}
