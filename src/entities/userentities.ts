import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Internship } from "./internshipentities";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @OneToMany(() => Internship, (internship: Internship) => internship.user)
  internships!: Internship[];
}
