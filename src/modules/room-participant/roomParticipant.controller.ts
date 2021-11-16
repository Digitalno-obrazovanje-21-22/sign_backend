import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { RoomParticipantService } from "./roomParticipant.service";
import { RoomParticipantCreationDto } from "./RoomParticipant.dto";
import { RoomParticipant } from "src/entities/roomParticipant.entity";


@Controller('/room-participant')
export class RoomParticipantController {
    constructor(private readonly roomParticipantService: RoomParticipantService){}

    @Get('/:roomId')
    async getAllByRoomId(@Param('roomId') roomId: number): Promise<RoomParticipant[]>{
        const roomParticipants = await this.roomParticipantService.findAllByRoomId(roomId);
        return roomParticipants;
    } 
    
    @Get('/:roomId/:userId')
    async getParticipant(@Param('roomId') roomId: number, @Param('userId') userId: number): Promise<RoomParticipant>{
        const roomParticipants = await this.roomParticipantService.findOneByRoomIdAndUserId(roomId, userId);
        return roomParticipants;
    } 

    @Post()
    async joinRoom(@Body() data: RoomParticipantCreationDto ): Promise<RoomParticipant>{
        return await this.roomParticipantService.joinRoom(data);
    }

    @Delete('/:id')
    async leaveRoom(@Param('id') roomParticipantId: number){
        return await this.roomParticipantService.leaveRoom(roomParticipantId);
    }
}