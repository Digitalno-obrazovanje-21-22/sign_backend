import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RoomParticipantService } from "./roomParticipant.service";
import { RoomParticipantCreationDto } from "./RoomParticipantDto";


@Controller('/room-participant')
export class RoomParticipantController {
    constructor(private readonly roomParticipantService: RoomParticipantService){}

    @Get('/:roomId/:userId')
    async getAll(@Param('roomId') roomId: number, @Param('userId') userId: number){
        const roomParticipants = await this.roomParticipantService.findAll(roomId, userId);
        return roomParticipants;
    }    

    @Post('/:roomId/:userId')
    async joinRoom(@Param('roomId') roomId: number, @Param('userId') userId: number, @Body() data: RoomParticipantCreationDto ){
        //TODO
        return;
    }
}