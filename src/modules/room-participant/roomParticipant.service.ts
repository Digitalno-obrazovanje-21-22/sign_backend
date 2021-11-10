import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoomParticipant } from "src/entities/roomParticipant.entity";
import { Repository } from "typeorm";

@Injectable()
export class RoomParticipantService {

    constructor(@InjectRepository(RoomParticipant) private roomRepository: Repository<RoomParticipant>) { }

    findAll(roomId: number, userId: number): Promise<RoomParticipant[]> {
        return this.roomRepository.find({ where: { roomId: roomId, userId: userId } });
    }

}