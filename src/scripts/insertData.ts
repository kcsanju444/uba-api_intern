import { AppDataSource } from "../data-source";
import { Internship } from "../entities/internshipentities";

async function fixOldInternshipDates() {
  await AppDataSource.initialize();
  const internshipRepository = AppDataSource.getRepository(Internship);

  const internships = await internshipRepository.find();
  for (const internship of internships) {
    internship.joined_date = new Date(
      new Date(internship.joined_date).toISOString().split("T")[0] + "T00:00:00.000Z"
    );
    internship.completion_date = new Date(
      new Date(internship.completion_date).toISOString().split("T")[0] + "T00:00:00.000Z"
    );

    await internshipRepository.save(internship);
    console.log(` Fixed internship ID ${internship.id}`);
  }

  console.log(" All internship dates updated to ISO format.");
  process.exit(0);
}

fixOldInternshipDates().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
