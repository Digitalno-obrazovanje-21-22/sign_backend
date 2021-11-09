import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateSignDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  videoUrl: string
}

export class UpdateSignDto {
  @IsOptional()
  name?: string

  @IsOptional()
  videoUrl?: string
}
