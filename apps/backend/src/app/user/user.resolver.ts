import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { NotFoundException } from "@nestjs/common";
import { User } from "./user.model";
import { UserService } from "./user.service";

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {
  }

  @Query(returns => User)
  async user(@Args('id') id: string): Promise<User> {
    const recipe = await this.userService.findOneById(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }

  @Mutation(returns => User)
  async addUser(
    @Args('title') title: string,
  ): Promise<User> {
    const user = await this.userService.create({
      title
    });
    return user;
  }
}
