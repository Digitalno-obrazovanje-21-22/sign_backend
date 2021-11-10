import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Room } from 'src/entities/room.entity'
import { RoomParticipant } from 'src/entities/roomParticipant.entity'
import { RoomParticipantService } from '../room-participant/roomParticipant.service'
import { RoomController } from './room.controller'
import { RoomService } from './room.service'

@Module({
    imports: [TypeOrmModule.forFeature([Room]), TypeOrmModule.forFeature([RoomParticipant])],
    providers: [RoomService, RoomParticipantService],
    exports: [TypeOrmModule, RoomService],
    controllers: [RoomController],
  })
  export class RoomModule {}