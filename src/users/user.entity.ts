import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Contact } from '../contacts/contact.entity';
import { Report } from '../reports/report.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts!: Contact[];

  @OneToMany(() => Report, (report) => report.user)
  reports!: Report[];
}
