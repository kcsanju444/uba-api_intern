import { UserResolver, InternshipResolver } from '../graphql/resolver/typeormreslver'; // adjust path
import { AppDataSource } from '../data-source';
import { User } from '../entities/userentities';
import { Internship } from '../entities/internshipentities';

// Mock the AppDataSource repo methods
jest.mock('../data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe('UserResolver', () => {
  let userResolver: UserResolver;
  let mockUserRepo: any;
  let mockInternshipRepo: any;

  beforeEach(() => {
    mockUserRepo = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };
    mockInternshipRepo = {
      delete: jest.fn(),
    };

    (AppDataSource.getRepository as jest.Mock).mockImplementation((entity) => {
      if (entity === User) return mockUserRepo;
      if (entity === Internship) return mockInternshipRepo;
    });

    userResolver = new UserResolver();
  });


  it('user() returns null if user not found (lines 13-16)', async () => {
    mockUserRepo.findOne.mockResolvedValue(null);
    const result = await userResolver.user(999);
    expect(result).toBeNull();
  });

  it('createUser() creates user with empty internships (line 21)', async () => {
    const user = { id: 1, name: 'John', email: 'john@example.com', internships: [] };
    mockUserRepo.create.mockReturnValue(user);
    mockUserRepo.save.mockResolvedValue(user);

    const result = await userResolver.createUser('John', 'john@example.com');
    expect(result).toEqual(user);
    expect(result.internships).toEqual([]);
  });

  it('updateUser() updates with only name (lines 26-30)', async () => {
    const user = { id: 1, name: 'Old', email: 'old@example.com' };
    mockUserRepo.findOne.mockResolvedValue(user);
    mockUserRepo.save.mockResolvedValue({ ...user, name: 'New' });

    const result = await userResolver.updateUser(1, 'New');
    expect(result.name).toBe('New');
    expect(result.email).toBe('old@example.com');
  });

  it('updateUser() updates with only email (lines 26-30)', async () => {
    const user = { id: 1, name: 'Old', email: 'old@example.com' };
    mockUserRepo.findOne.mockResolvedValue(user);
    mockUserRepo.save.mockResolvedValue({ ...user, email: 'new@example.com' });

    const result = await userResolver.updateUser(1, undefined, 'new@example.com');
    expect(result.email).toBe('new@example.com');
  });

  it('updateUser() throws if user not found (line 32)', async () => {
    mockUserRepo.findOne.mockResolvedValue(null);
    await expect(userResolver.updateUser(999, 'Name')).rejects.toThrow('User not found');
  });

  it('deleteUser() returns false if no user deleted (line 38)', async () => {
    mockInternshipRepo.delete.mockResolvedValue({ affected: 1 });
    mockUserRepo.delete.mockResolvedValue({ affected: 0 });
    const result = await userResolver.deleteUser(999);
    expect(result).toBe(false);
  });

  it('deleteUser() deletes internships and user (line 45)', async () => {
    mockInternshipRepo.delete.mockResolvedValue({ affected: 3 });
    mockUserRepo.delete.mockResolvedValue({ affected: 1 });
    const result = await userResolver.deleteUser(1);
    expect(result).toBe(true);
  });
});
