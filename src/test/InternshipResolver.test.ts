import { UserResolver, InternshipResolver } from '../graphql/resolver/typeormreslver'; // adjust path
import { AppDataSource } from '../data-source';
import { User } from '../entities/userentities';
import { Internship } from '../entities/internshipentities';
jest.mock('../data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe('InternshipResolver', () => {
  let internshipResolver: InternshipResolver;
  let mockInternshipRepo: any;
  let mockUserRepo: any;

  beforeEach(() => {
    mockInternshipRepo = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };
    mockUserRepo = {
      findOneBy: jest.fn(),
    };

    (AppDataSource.getRepository as jest.Mock).mockImplementation((entity) => {
      if (entity === Internship) return mockInternshipRepo;
      if (entity === User) return mockUserRepo;
    });

    internshipResolver = new InternshipResolver();
  });
  it('updateInternship() updates partial fields (line 59, 61-65)', async () => {
    const internship = {
      id: 1,
      joined_date: new Date('2023-01-01'),
      completion_date: new Date('2023-06-01'),
      is_certified: false,
      mentor_name: 'Old Mentor',
      user: { id: 1 },
    };
    mockInternshipRepo.findOne.mockResolvedValue(internship);
    mockInternshipRepo.save.mockResolvedValue({
      ...internship,
      is_certified: true,
      mentor_name: 'New Mentor',
    });

    const result = await internshipResolver.updateInternship(
      1,
      undefined,
      undefined,
      true,
      'New Mentor'
    );

    expect(result.is_certified).toBe(true);
    expect(result.mentor_name).toBe('New Mentor');
  });

  it('updateInternship() updates user by userId (lines 70-92)', async () => {
    const internship = { id: 1, user: { id: 1 } };
    const user = { id: 2 };
    mockInternshipRepo.findOne.mockResolvedValue(internship);
    mockUserRepo.findOneBy.mockResolvedValue(user);
    mockInternshipRepo.save.mockResolvedValue({ ...internship, user });

    const result = await internshipResolver.updateInternship(1, undefined, undefined, undefined, undefined, 2);
    expect(result.user).toEqual(user);
  });

  it('updateInternship() throws error if userId invalid (line 90-92)', async () => {
    const internship = { id: 1, user: { id: 1 } };
    mockInternshipRepo.findOne.mockResolvedValue(internship);
    mockUserRepo.findOneBy.mockResolvedValue(null);

    await expect(internshipResolver.updateInternship(1, undefined, undefined, undefined, undefined, 999))
      .rejects.toThrow('User not found');
  });

  it('deleteInternship() returns false if no rows affected (line 120)', async () => {
    mockInternshipRepo.delete.mockResolvedValue({ affected: 0 });
    const result = await internshipResolver.deleteInternship(999);
    expect(result).toBe(false);
  });
});