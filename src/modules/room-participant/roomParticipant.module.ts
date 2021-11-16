import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Room } from 'src/entities/room.entity'
import { RoomParticipant } from 'src/entities/roomParticipant.entity'
import { User } from 'src/entities/user.entity'
import { RoomModule } from '../room/room.module'
import { UserModule } from '../user/user.module'
import { RoomParticipantController } from './roomParticipant.controller'
import { RoomParticipantService } from './roomParticipant.service'

@Module({
  imports: [TypeOrmModule.forFeature([RoomParticipant])],
  providers: [RoomParticipantService],
  exports: [TypeOrmModule, RoomParticipantService],
  controllers: [RoomParticipantController],
})
export class RoomParticipantModule {}
