import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Put } from '@nestjs/common'
import { UpdateUserDto } from './user.dto'
import { UserService } from './user.service'

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    const users = await this.userService.findAll()
    return users
  }

  @Get('/:id')
  async getById(@Param('id') id: number) {
    const user = await this.userService.findOneById(id)
    return user
  }

  @Put('/:id')
  async updateUser(@Param('id') id: number, @Body() data: UpdateUserDto) {
    const user = await this.userService.findOneById(id)
    if (!user) {
      throw new HttpException('No such user!', HttpStatus.BAD_REQUEST)
    }
    return this.userService.update(id, data)
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    const user = await this.userService.findOneById(id)
    if (!user) {
      throw new HttpException('No such user!', HttpStatus.BAD_REQUEST)
    }
    return this.userService.remove(id)
  }

  @Get('/leaderboard/all')
  async getLeaderboard() {
    return this.userService.leaderboard()
  }
}
