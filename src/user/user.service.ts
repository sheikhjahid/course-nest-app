import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string, admin: boolean) {
    const user = this.repo.create({ email, password, admin });
    return this.repo.save(user);
  }

  async find() {
    return await this.repo.find({
      relations: {
        reports: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.repo.findOne({
      where: { id },
      relations: ['reports'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.repo.findOne({
      where: { email },
    });

    return user;
  }

  async update(id: number, payload: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.email = payload.email;
    user.password = payload.password;

    return await this.repo.save(user);
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.repo.remove(user);
  }
}
