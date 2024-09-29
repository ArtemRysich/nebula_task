import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags, ApiHeader } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/upadate-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  USER_ID_KEY = 'split_id';
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.createUser(userDto, res);
  }

  @Get()
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiHeader({
    name: 'Cookie',
    required: true,
    description: 'Cookie containing user identifier (split_id).',
  })
  @ApiResponse({ status: 200, description: 'User found.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  find(@Req() request: Request) {
    const userId = request.cookies[this.USER_ID_KEY];

    return this.userService.getUser(userId);
  }

  @UsePipes(new ValidationPipe())
  @Put()
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiHeader({
    name: 'Cookie',
    required: true,
    description: 'Cookie containing user identifier (split_id).',
  })
  @ApiResponse({ status: 200, description: 'User successfully updated.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  upadate(@Req() request: Request, @Body() userDto: UpdateUserDto) {
    const userId = request.cookies[this.USER_ID_KEY];

    return this.userService.updateUser(userId, userDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiHeader({
    name: 'Cookie',
    required: true,
    description: 'Cookie containing user identifier (split_id).',
  })
  @ApiResponse({ status: 200, description: 'User successfully deleted.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  remove(@Req() request: Request) {
    const userId = request.cookies[this.USER_ID_KEY];

    return this.userService.removeUser(userId);
  }
}
