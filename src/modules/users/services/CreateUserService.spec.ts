import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createUser: CreateUserService;

describe('CreateUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Jonh Doe',
      email: 'joh@example.com',
      password: 'password@',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'Jonh Doe',
      email: 'joh@example.com',
      password: 'password@',
    });

    expect(
      createUser.execute({
        name: 'Jonh Doe',
        email: 'joh@example.com',
        password: 'password@',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
