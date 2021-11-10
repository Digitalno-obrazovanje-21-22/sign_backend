import { Controller, Get, Param, Post } from "@nestjs/common";
import { RoomService } from "./room.service";

@Controller('/room')
export class RoomController {
    constructor(private readonly roomService: RoomService){}

    @Get()
    async getAll(){
        const rooms = await this.roomService.findAll();
        return rooms;
    }

    @Get('/:id')
    async getById(@Param('id') id: number) {
      const room = await this.roomService.findOneById(id)
      return room;
    }

    @Post()
    async createRoom(){
      const room = await this.roomService.createRoom();
      return room;
    }
}