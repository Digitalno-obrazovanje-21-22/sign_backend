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

export class RoomParticipantDto {
    @IsNotEmpty()
    id: number

    @IsNotEmpty()
    isOwner: boolean
  
    @IsNotEmpty()
    score: number

    @IsNotEmpty()
    userId: number

    @IsNotEmpty()
    roomId: number
}


