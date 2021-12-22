import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from '../user/user.module'
import { UserService } from '../user/user.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
require('dotenv').config()

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30 days' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
