import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoomParticipant } from 'src/entities/roomParticipant.entity'
import { User } from 'src/entities/user.entity'
import { RoomParticipantController } from './roomParticipant.controller'
import { RoomParticipantService } from './roomParticipant.service'

@Module({
  imports: [TypeOrmModule.forFeature([RoomParticipant]), TypeOrmModule.forFeature([User])],
  providers: [RoomParticipantService],
  exports: [TypeOrmModule, RoomParticipantService],
  controllers: [RoomParticipantController],
})
export class RoomParticipantModule {}
