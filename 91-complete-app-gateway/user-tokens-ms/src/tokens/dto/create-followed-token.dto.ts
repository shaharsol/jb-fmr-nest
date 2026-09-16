import { Transform } from 'class-transformer';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateFollowedTokenDto {
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  @IsString()
  @MinLength(3)
  @MaxLength(4)
  @Matches(/^[A-Z]{3,4}$/, {
    message: 'symbol must be 3-4 uppercase letters (e.g. BTC, ETH, DOGE)',
  })
  symbol: string;
}
