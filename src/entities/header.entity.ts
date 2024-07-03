import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Api } from 'src/entities/api.entity';

@Entity()
export class Header {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isRequired: boolean;

  @Column()
  apiId: number;
  
  @ManyToOne(() => Api, api => api.headers, { onDelete: 'CASCADE', nullable: false })
  api: Api;
}
