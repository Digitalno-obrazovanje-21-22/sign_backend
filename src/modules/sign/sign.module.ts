import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Sign } from 'src/entities/sign.entity'
import { SignStats } from 'src/entities/signStats.entity'
import { User } from 'src/entities/user.entity'
import { SignController } from './sign.controller'
import { SignService } from './sign.service'
require('dotenv').config()

@Module({
  imports: [TypeOrmModule.forFeature([Sign, SignStats, User])],
  providers: [SignService],
  exports: [SignService],
  controllers: [SignController],
})
export class SignModule {}
