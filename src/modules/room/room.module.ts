import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Room } from 'src/entities/room.entity'
import { RoomController } from './room.controller'
import { RoomService } from './room.service'

@Module({
    imports: [TypeOrmModule.forFeature([Room])],
    providers: [RoomService],
    exports: [TypeOrmModule, RoomService],
    controllers: [RoomController],
  })
  export class RoomModule {}