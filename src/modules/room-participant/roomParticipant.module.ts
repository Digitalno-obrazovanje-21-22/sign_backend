import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoomParticipant } from 'src/entities/roomParticipant.entity'
import { RoomParticipantController } from './roomParticipant.controller'
import { RoomParticipantService } from './roomParticipant.service'

@Module({
  imports: [TypeOrmModule.forFeature([RoomParticipant])],
  providers: [RoomParticipantService],
  exports: [TypeOrmModule, RoomParticipantService],
  controllers: [RoomParticipantController],
})
export class RoomParticipantModule {}
