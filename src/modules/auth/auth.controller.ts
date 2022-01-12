import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { SignInDto, SignUpDto } from './auth.dto'
import { AuthService } from './auth.service'

@Controller('/auth')
export class AuthController {
  constructor(private readonly userService: UserService, private authService: AuthService) {}

  @Post('/signin')
  async singIn(@Body() body: SignInDto) {
    const user = await this.authService.validateUser(body.email, body.password)
    if (!user) {
      throw new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED)
    }
    return {
      token: await this.authService.generateToken(user.id, user.firstName, user.lastName),
    }
  }

  @Post('/signup')
  async signUp(@Body() body: SignUpDto) {
    const existingUser = await this.userService.findOneByEmail(body.email)
    if (!!existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT)
    }
    const user = await this.userService.create({
      ...body,
      score: 0,
      password: await this.authService.hashPassword(body.password),
    })

    return {
      token: await this.authService.generateToken(user.id, user.firstName, user.lastName),
    }
  }

  @Get('/user/:token')
  async getUser(@Param('token') token: string) {
    const user = await this.authService.getUserByToken(token)
    if (!user) {
      return null
    }
    return this.userService.findOneById(user.id)
  }
}
