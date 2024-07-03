import { IsOptional, IsInt, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateResponseDto {
  @IsInt()
  @IsNotEmpty()
  status: number;

  @IsString()
  @IsNotEmpty()
  response: string;

  @IsBoolean()
  @IsOptional()
  markDefault: boolean;
}

