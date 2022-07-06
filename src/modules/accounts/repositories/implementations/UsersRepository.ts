import { Repository } from "typeorm";
import dataSource from "../../../../database/data-source";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";


class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  async create({ name, email, password, driver_license, avatar, id}: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name, 
      email, 
      password, 
      driver_license,
      avatar,
      id,
    });

    await this.repository.save(user)
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email }})

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ where: {id} })

    return user
  }
}

export { UsersRepository }