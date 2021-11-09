import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Sign } from 'src/entities/sign.entity'
import { SignController } from './sign.controller'
import { SignService } from './sign.service'
require('dotenv').config()

@Module({
  imports: [TypeOrmModule.forFeature([Sign])],
  providers: [SignService],
  exports: [SignService],
  controllers: [SignController],
})
export class SignModule {}
