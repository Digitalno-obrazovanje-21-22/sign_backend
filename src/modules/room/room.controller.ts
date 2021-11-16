import { Controller, Get, Param, Post } from '@nestjs/common'
import { Room } from 'src/entities/room.entity'
import { RoomParticipantService } from '../room-participant/roomParticipant.service'
import { RoomDto } from './room.dto'
import { RoomService } from './room.service'

@Controller('/room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly roomParticipantService: RoomParticipantService,
  ) {}

  @Get()
  async getAll(): Promise<RoomDto[]> {
    const rooms = await this.roomService.findAll()
    const participants = await this.roomParticipantService.findAll()
    let roomDtos: RoomDto[] = []
    console.log(rooms)
    console.log(participants)
    rooms.forEach(room => {
      const roomDto: RoomDto = {
        id: room.id,
        name: room.name,
        private: room.private,
        isOver: room.isOver,
        code: room.code,
        roomParticipants: participants.filter(p => p.roomId == room.id),
      }
      roomDtos.push(roomDto)
    })
    return roomDtos
  }

  @Get('/:id')
  async getById(@Param('id') id: number): Promise<Room> {
    const room = await this.roomService.findOneById(id)
    return room
  }

  @Post()
  async createRoom(): Promise<Room> {
    const room = await this.roomService.createRoom()
    return room
  }
}
