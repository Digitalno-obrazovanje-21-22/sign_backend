import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RoomParticipantService } from "./roomParticipant.service";
import { RoomParticipantCreationDto } from "./RoomParticipant.dto";


@Controller('/room-participant')
export class RoomParticipantController {
    constructor(private readonly roomParticipantService: RoomParticipantService){}

    @Get('/:roomId/:userId')
    async getAll(@Param('roomId') roomId: number, @Param('userId') userId: number){
        const roomParticipants = await this.roomParticipantService.findAll(roomId, userId);
        return roomParticipants;
    }    

    @Post()
    async joinRoom(@Body() data: RoomParticipantCreationDto ){
        return await this.roomParticipantService.joinRoom(data);
    }
}