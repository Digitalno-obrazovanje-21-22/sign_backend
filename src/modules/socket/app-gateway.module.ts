import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { RoomParticipantModule } from '../room-participant/roomParticipant.module'
import { AppGateway } from './app-gateway'

@Module({
  imports: [AuthModule, RoomParticipantModule],
  controllers: [],
  providers: [AppGateway],
})
export class AppGatewayModule {}
