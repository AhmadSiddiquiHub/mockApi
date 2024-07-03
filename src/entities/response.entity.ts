import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Api } from './api.entity';

@Entity()
export class Response {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: number;

  @Column()
  response: string;

  @Column({ default: false })
  markDefault: boolean;

  @Column()
  apiId: number;

  @ManyToOne(() => Api, api => api.responses, { onDelete: 'CASCADE', nullable: false })
  api: Api;
}
