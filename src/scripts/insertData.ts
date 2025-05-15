import { AppDataSource } from "../data-source";  
import { User } from "../entities/userentities";
import { Internship } from "../entities/internshipentities";

async function main() {
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);
  const internshipRepository = AppDataSource.getRepository(Internship);

  const user = new User();
  user.name = "sanju kc";
  user.email = "sanju@example.com";

  await userRepository.save(user);

  const internship = new Internship();
  internship.joined_date = new Date("2023-01-01");
  internship.completion_date = new Date("2023-06-01");
  internship.is_certified = true;
  internship.mentor_name = "Jane Smith";
  internship.user = user;

  await internshipRepository.save(internship);

  console.log("User and Internship saved successfully!");
}

main().catch(error => console.error(error));
