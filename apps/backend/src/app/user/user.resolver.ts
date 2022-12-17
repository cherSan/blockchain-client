import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { NotFoundException } from "@nestjs/common";
import { CreateUser, User } from "./user.model";
import { UserService } from "./user.service";

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {
  }

  @Query(() => [User], { name: 'users' })
  async getUsers(): Promise<User[]> {
    const recipe = await this.userService.find();
    if (!recipe) {
      throw new NotFoundException();
    }
    return recipe;
  }

  @Mutation(() => User, { name: 'user' })
  async createUser(
    @Args('user') createUser: CreateUser,
  ): Promise<User> {
    return await this.userService.create(createUser);
  }
}
