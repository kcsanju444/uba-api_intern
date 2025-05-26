import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Internship } from "./internshipentities";

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column({ unique: true })  // <- ensures uniqueness at DB level
  email!: string;

  @Field(() => [Internship])
  @OneToMany(() => Internship, internship => internship.user)
  internships!: Internship[];
}
