import { IsNotEmpty } from "class-validator"
import { RoomParticipant } from "src/entities/roomParticipant.entity"

export class CreateRoomDto {
    @IsNotEmpty({ message: 'name should not be empty' })
    name: string
  
    @IsNotEmpty({ message: 'private should be defined' })
    private: boolean

    @IsNotEmpty({ message: 'isOver should be defined' })
    isOver: boolean

    @IsNotEmpty({ message: 'code should not be empty' })
    code: string

}

export class RoomDto {

    @IsNotEmpty()
    id: number

    @IsNotEmpty()
    name: string
  
    @IsNotEmpty()
    private: boolean

    @IsNotEmpty()
    isOver: boolean

    @IsNotEmpty()
    code: string

    @IsNotEmpty()
    roomParticipants: RoomParticipant[]

}