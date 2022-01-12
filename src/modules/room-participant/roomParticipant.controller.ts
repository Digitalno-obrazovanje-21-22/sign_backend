import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { RoomParticipantService } from "./roomParticipant.service";
import { RoomParticipantCreationDto, RoomParticipantDto } from "./RoomParticipant.dto";
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
    async deleteById(@Param('id') roomParticipantId: number){
        return await this.roomParticipantService.deleteById(roomParticipantId);
    }

    @Delete('/:roomId/:userId')
    async deleteByRoomIdAndUserId(@Param('roomId') roomId: number, @Param('userId') userId: number){
        return await this.roomParticipantService.deleteByRoomIdAndUserId(roomId, userId);
    }

    @Put('/:id')
    async updateScore(@Param('id') roomParticipantId: number, @Body() data: RoomParticipantDto){
        if(roomParticipantId===null ){
            throw new Error("RoomParticipant ID Missing!");
        }
        return await this.roomParticipantService.updateScore(roomParticipantId, data);
    }

    @Put('/sumOverallScore/:userId')
    async sumOverallUserScore(@Param('userId') userId: number) {
        return await this.roomParticipantService.sumOverallUserScore(userId);
    }
}