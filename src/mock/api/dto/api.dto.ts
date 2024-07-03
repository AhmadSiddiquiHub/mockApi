import { IsNotEmpty, IsInt } from 'class-validator';


export class ApiDto {
  @IsInt()
  @IsNotEmpty({ message: 'id is required' })
  id: number;
}
