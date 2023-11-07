import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as uuid from 'uuid'
import { ulid } from 'ulid';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) { }

  async create({ name, email, password }: CreateUserDto) {
    await this.checkUserExists(email);

    const signupVerifyToken = uuid.v1()
    const user = new User();

    await this.saveUser(name, email, password, signupVerifyToken);
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  private checkUserExists(email: string) {
    return false
  }
  private async saveUser(name: string, email: string, password: string, signupVerifyToken: string) {
    const user = new User()
    user.id = ulid()
    user.name = name
    user.eamil = email
    user.password = password
    user.signupVerifyToken = signupVerifyToken
    await this.usersRepository.save(user)
  }
}
