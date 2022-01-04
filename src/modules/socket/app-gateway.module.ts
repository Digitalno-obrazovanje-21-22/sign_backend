import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { RoomParticipantModule } from '../room-participant/roomParticipant.module'
import { RoomModule } from '../room/room.module'
import { AppGateway } from './app-gateway'

@Module({
  imports: [AuthModule, RoomParticipantModule, RoomModule],
  controllers: [],
  providers: [AppGateway],
})
export class AppGatewayModule {}
