import { IsNotEmpty } from "class-validator"

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