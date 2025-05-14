import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Internship } from "./Internship";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @OneToMany(() => Internship, (internship) => internship.user)
  internships: Internship[];
}
