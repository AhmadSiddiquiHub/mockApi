import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Api } from './api.entity';

@Entity()
export class Parameter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isRequired: boolean;

  @Column()
  nestedPayload: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  regex: string;

  @Column({ nullable: true })
  maxLength: number;

  @Column({ nullable: true })
  minLength: number;

  @Column({ nullable: true })
  minValue: number;

  @Column({ nullable: true })
  maxValue: number;

  @Column({ type: 'text', array: true, nullable: true })
  enumValues: string[];

  @Column()
  apiId: number;

  @ManyToOne(() => Api, api => api.parameters, { onDelete: 'CASCADE', nullable: false })
  api: Api;
}
