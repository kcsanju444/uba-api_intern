// src/entities/Internship.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user';

@Entity()
export class Internship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  joinedDate: Date;

  @Column()
  completionDate: Date;

  @Column()
  isCertified: boolean;

  @Column()
  mentorName: string;

  @ManyToOne(() => User, (user) => user.internships)
  @JoinColumn({ name: 'user_id' }) // foreign key column
  user: User;
}
