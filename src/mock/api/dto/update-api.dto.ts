import { IsString, IsNotEmpty, IsArray, ValidateNested, IsIn, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateHeaderDto } from '../headers/dto/create-header.dto';
import { CreateParameterDto } from '../parameters/dto/create-parameter.dto';
import { CreateResponseDto } from '../responses/dto/create-response.dto';

export class UpdateApiDto {
  @IsNotEmpty({ message: 'id is required' })
  @IsInt({ message: 'id must be a number' })
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['GET', 'POST', 'PUT', 'DELETE'], { message: 'HTTP method must be one of the following: GET, POST, PUT, DELETE' })
  httpMethod: string;

  @IsString()
  @IsNotEmpty()
  endpoint: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateHeaderDto)
  headers: CreateHeaderDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateParameterDto)
  parameters: CreateParameterDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateResponseDto)
  responses: CreateResponseDto[];
}
