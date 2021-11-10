import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RoomParticipantService } from "./roomParticipant.service";
import { RoomParticipantCreationDto } from "./RoomParticipant.dto";


@Controller('/room-participant')
export class RoomParticipantController {
    constructor(private readonly roomParticipantService: RoomParticipantService){}

    @Get('/:roomId')
    async getAllByRoomId(@Param('roomId') roomId: number){
        const roomParticipants = await this.roomParticipantService.findAllByRoomId(roomId);
        return roomParticipants;
    } 
    
    @Get('/:roomId/:userId')
    async getParticipant(@Param('roomId') roomId: number, @Param('userId') userId: number){
        const roomParticipants = await this.roomParticipantService.findOne(roomId, userId);
        return roomParticipants;
    } 

    @Post()
    async joinRoom(@Body() data: RoomParticipantCreationDto ){
        return await this.roomParticipantService.joinRoom(data);
    }
}