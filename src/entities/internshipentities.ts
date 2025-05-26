import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./userentities";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class Internship {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Date)
@Column({ type: "timestamp" }) // use timestamp instead of date
joined_date!: Date;

@Field(() => Date)
@Column({ type: "timestamp" })
completion_date!: Date;
  @Field()
  @Column()
  is_certified!: boolean;

  @Field()
  @Column()
  mentor_name!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.internships)
  user!: User;
}