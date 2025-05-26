import { Resolver, Query, Mutation, Arg, ID } from "type-graphql";
import { User } from "../../entities/userentities";
import { Internship } from "../../entities/internshipentities";
import { AppDataSource } from "../../data-source";

@Resolver()
export class UserResolver {
  private userRepo = AppDataSource.getRepository(User);

 
  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userRepo.find({ relations: ["internships"] });
  }

  @Query(() => User, { nullable: true })
  async user(@Arg("id", () => ID) id: number): Promise<User | null> {
    return this.userRepo.findOne({ where: { id }, relations: ["internships"] });
  }

  @Mutation(() => User)
  async createUser(
    @Arg("name") name: string,
    @Arg("email") email: string
  ): Promise<User> {
    const user = this.userRepo.create({ name, email, internships: [] });
    return this.userRepo.save(user);
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("id", () => ID) id: number,
    @Arg("name", { nullable: true }) name?: string,
    @Arg("email", { nullable: true }) email?: string
  ): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new Error("User not found");
    }
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    return this.userRepo.save(user);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id", () => ID) id: number): Promise<boolean> {
    await AppDataSource.getRepository(Internship).delete({ user: { id } });
    const result = await this.userRepo.delete(id);
    return result.affected !== 0;
  }
}

@Resolver()
export class InternshipResolver {
  private internshipRepo = AppDataSource.getRepository(Internship);
  private userRepo = AppDataSource.getRepository(User);

 @Query(() => [Internship])
  async internships(): Promise<Internship[]> {
    return this.internshipRepo.find({ relations: ["user"] });
  }

  @Query(() => Internship, { nullable: true })
  async internship(@Arg("id", () => ID) id: number): Promise<Internship | null> {
    return this.internshipRepo.findOne({ where: { id }, relations: ["user"] });
  }

  @Mutation(() => Internship)
  async createInternship(
    @Arg("joined_date") joined_date: Date,
    @Arg("completion_date") completion_date: Date,
    @Arg("is_certified") is_certified: boolean,
    @Arg("mentor_name") mentor_name: string,
    @Arg("userId", () => ID) userId: number
  ): Promise<Internship> {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) {
      throw new Error("User not found");
    }
    const internship = this.internshipRepo.create({
      joined_date,
      completion_date,
      is_certified,
      mentor_name,
      user,
    });
    return this.internshipRepo.save(internship);
  }

  @Mutation(() => Internship)
  async updateInternship(
    @Arg("id", () => ID) id: number,
    @Arg("joined_date", { nullable: true }) joined_date?: Date,
    @Arg("completion_date", { nullable: true }) completion_date?: Date,
    @Arg("is_certified", { nullable: true }) is_certified?: boolean,
    @Arg("mentor_name", { nullable: true }) mentor_name?: string,
    @Arg("userId", () => ID, { nullable: true }) userId?: number
  ): Promise<Internship> {
    const internship = await this.internshipRepo.findOne({ where: { id }, relations: ["user"] });
    if (!internship) {
      throw new Error("Internship not found");
    }

    if (joined_date !== undefined) internship.joined_date = joined_date;
    if (completion_date !== undefined) internship.completion_date = completion_date;
    if (is_certified !== undefined) internship.is_certified = is_certified;
    if (mentor_name !== undefined) internship.mentor_name = mentor_name;

    if (userId !== undefined) {
      const user = await this.userRepo.findOneBy({ id: userId });
      if (!user) throw new Error("User not found");
      internship.user = user;
    }

    return this.internshipRepo.save(internship);
  }

  @Mutation(() => Boolean)
  async deleteInternship(@Arg("id", () => ID) id: number): Promise<boolean> {
    const result = await this.internshipRepo.delete(id);
    return result.affected !== 0;
  }
}
