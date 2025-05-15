import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./userentities";

@Entity()
export class Internship {
  @PrimaryGeneratedColumn()
  id!: number;

 @Column({ type: "date" })
joined_date!: Date;

@Column({ type: "date" })
completion_date!: Date;


  @Column()
  is_certified!: boolean;

  @Column()
  mentor_name!: string;

  @ManyToOne(() => User, (user) => user.internships)
  user!: User;
}
