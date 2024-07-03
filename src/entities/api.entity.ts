import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Header } from './header.entity';
import { Parameter } from './parameter.entity';
import { Response } from './response.entity';
@Entity()
export class Api {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column()
  httpMethod: string;

  @Column()
  endpoint: string;

  @OneToMany(() => Header, header => header.api, { cascade: true })
  headers: Header[];

  @OneToMany(() => Parameter, parameter => parameter.api, { cascade: true })
  parameters: Parameter[];

  @OneToMany(() => Response, response => response.api, { cascade: true })
  responses: Response[];
}