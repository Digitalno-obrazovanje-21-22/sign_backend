import { IsNotEmpty } from "class-validator"

export class RoomParticipantCreationDto {

    @IsNotEmpty()
    isOwner: boolean
  
    @IsNotEmpty()
    score: number

    @IsNotEmpty()
    userId: number

    @IsNotEmpty()
    roomId: number
}