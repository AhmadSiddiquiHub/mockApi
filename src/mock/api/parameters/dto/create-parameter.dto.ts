import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsNumber, IsArray, ValidateIf, ArrayNotEmpty, IsIn, IsInt } from 'class-validator';

export class CreateParameterDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsBoolean({ message: 'Is Required must be a boolean' })
  @IsNotEmpty({ message: 'Is Required is required' })
  isRequired: boolean;

  @IsString({ message: 'Nested Payload must be a string' })
  @IsNotEmpty({ message: 'Nested Payload is required' })
  nestedPayload: string;

  @IsString({ message: 'Type must be a string' })
  @IsNotEmpty({ message: 'Type is required' })
  @IsIn(['String', 'Number', 'Boolean', 'Enum'], { message: 'Type must be one of the following: String, Number, Boolean, Enum' })
  type: string;

  @ValidateIf(o => o.type === 'String')
  @IsOptional()
  @IsString({ message: 'Regex must be a string' })
  regex: string;

  @ValidateIf(o => o.type === 'String')
  @IsOptional()
  @IsNumber({}, { message: 'MaxLength must be a number' })
  maxLength: number;

  @ValidateIf(o => o.type === 'String')
  @IsOptional()
  @IsNumber({}, { message: 'MinLength must be a number' })
  minLength: number;

  @ValidateIf(o => o.type === 'Number')
  @IsOptional()
  @IsNumber({}, { message: 'MinValue must be a number' })
  minValue: number;

  @ValidateIf(o => o.type === 'Number')
  @IsOptional()
  @IsNumber({}, { message: 'MaxValue must be a number' })
  maxValue: number;

  @ValidateIf(o => o.type === 'Enum')
  @IsArray({ message: 'EnumValues must be an array' })
  @ArrayNotEmpty({ message: 'EnumValues must not be empty' })
  @IsString({ each: true, message: 'Each EnumValue must be a string' })
  @IsNotEmpty({ message: 'EnumValues are required' })
  enumValues: string[];
}
