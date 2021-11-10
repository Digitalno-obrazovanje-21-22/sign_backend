import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoomParticipant } from "src/entities/roomParticipant.entity";
import { Repository } from "typeorm";
import { RoomParticipantCreationDto } from "./RoomParticipant.dto";

@Injectable()
export class RoomParticipantService {


    constructor(@InjectRepository(RoomParticipant) private roomParticipantRepository: Repository<RoomParticipant>) { }

    findAll(roomId: number, userId: number): Promise<RoomParticipant[]> {
        return this.roomParticipantRepository.find({ where: { roomId: roomId, userId: userId } });
    }

    joinRoom(roomParticipantCreationDto: Partial<RoomParticipantCreationDto>): Promise<RoomParticipant>{
        return this.roomParticipantRepository.save(roomParticipantCreationDto);
    }

}