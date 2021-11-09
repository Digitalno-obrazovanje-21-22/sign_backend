import { IsEmail, IsNotEmpty, IsOptional, Max, Min } from 'class-validator'

export class SignInDto {
  @IsOptional()
  email: string

  @IsOptional()
  password: string
}

export class SignUpDto {
  @IsNotEmpty({ message: 'First name should not be empty' })
  firstName: string

  @IsNotEmpty({ message: 'Last name should not be empty' })
  lastName: string

  @IsEmail(undefined, { message: 'Please enter email' })
  @IsNotEmpty({ message: 'Email name should not be empty' })
  email: string

  @Min(8)
  @Max(30)
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string
}
