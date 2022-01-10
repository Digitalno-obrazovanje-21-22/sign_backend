import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { AuthModule } from './auth/auth.module'
import { RoomParticipantModule } from './room-participant/roomParticipant.module'
import { RoomModule } from './room/room.module'
import { SignModule } from './sign/sign.module'
import { AppGatewayModule } from './socket/app-gateway.module'
import { UserModule } from './user/user.module'
require('dotenv').config()

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
      logging: false,
      autoLoadEntities: true,
    }),
    AuthModule,
    UserModule,
    SignModule,
    RoomModule,
    RoomParticipantModule,
    AppGatewayModule,
  ],
})
export class AppModule {}
