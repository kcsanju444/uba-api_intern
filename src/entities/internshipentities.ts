import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./userentities";

@Entity()
export class Internship {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "date" })
  joined_date!: string;

  @Column({ type: "date" })
  completion_date!: string;

  @Column()
  is_certified!: boolean;

  @Column()
  mentor_name!: string;

  @ManyToOne(() => User, (user) => user.internships)
  user!: User;
}
