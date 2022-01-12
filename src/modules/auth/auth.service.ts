import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '../../entities/user.entity'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email)
    if (!user || !user.password) {
      return null
    }
    if (await AuthService.comparePasswords(password, user.password)) {
      return user
    }
    return null
  }

  async getUserByToken(token: string) {
    //@ts-ignore
    const { id } = this.jwtService.decode(token)
    const user = await this.userService.findOneById(id)

    return user
  }

  async generateToken(id: number, firstName: string, lastName: string): Promise<string> {
    return this.jwtService.signAsync({ id, firstName, lastName })
  }

  hashPassword(password: string): Promise<string> {
    const saltRounds = 10
    return bcrypt.hash(password, saltRounds)
  }

  static comparePasswords(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash)
  }
}
