import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { maxHeaderSize } from "http";
import { Room } from "src/entities/room.entity";
import { Repository } from "typeorm";

@Injectable()
export class RoomService {

    constructor(@InjectRepository(Room) private roomRepository: Repository<Room>) { }

    findAll(): Promise<Room[]> {
        return this.roomRepository.find();
    }

    findOneById(id: number): Promise<Room> {
        return this.roomRepository.findOne(id);
    }

    createRoom(): Promise<Room> {
        let code = (Math.random() + 1).toString(36).substring(2,15);
        let roomName = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
        return this.roomRepository.save({
            name: "Room" + roomName,
            code: code,
            isOver: false,
            private: false
        });
    }
}