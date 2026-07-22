import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('simple-json', { nullable: true })
  problems!: string[];

  @Column()
  address!: string;

  @Column({ type: 'text', nullable: true })
  observation?: string;

  @Column({ type: 'text', nullable: true })
  image?: string;

  @Column({ nullable: true })
  date?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.reports, { onDelete: 'CASCADE' })
  user!: User;
}
