import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Sign } from 'src/entities/sign.entity'
import { SignStats } from 'src/entities/signStats.entity'
import { AuthModule } from '../auth/auth.module'
import { RoomParticipantModule } from '../room-participant/roomParticipant.module'
import { RoomModule } from '../room/room.module'
import { AppGateway } from './app-gateway'

@Module({
  imports: [AuthModule, RoomParticipantModule, RoomModule, TypeOrmModule.forFeature([SignStats, Sign])],
  controllers: [],
  providers: [AppGateway],
})
export class AppGatewayModule {}
