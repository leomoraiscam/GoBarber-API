import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';

export default new class UsersController {
  public async create(request:Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password });

    const serializedUser = {
      id: user.id,
      name: user.name,
      email: user.name,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(serializedUser);
  }
}
