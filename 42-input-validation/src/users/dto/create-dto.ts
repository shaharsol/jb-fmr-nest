import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20, { message: ' ' })
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  lastName!: string;
}
