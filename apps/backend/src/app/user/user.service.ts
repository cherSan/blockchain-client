import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.model";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {
  }
  async create(user: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(user);
    const response = await this.usersRepository.save(newUser);
    return {
      id: response.id,
      title: response.title
    };
  }

  async findOneById(id: string): Promise<User> {
    return {
      id: 2,
      title: "tets"
    } as any;
  }
  async remove(id: string): Promise<boolean> {
    return true;
  }
}
