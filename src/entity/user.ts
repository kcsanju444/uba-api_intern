
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Internship } from './internship';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Internship, (internship) => internship.user)
  internships: Internship[];
}
