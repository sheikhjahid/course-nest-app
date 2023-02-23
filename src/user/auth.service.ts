import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { SignUp } from './dtos/signup.dto';

const script = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private service: UserService) {}

  async signup(body: SignUp) {
    const user = await this.service.findByEmail(body.email);
    if (user) {
      throw new BadRequestException('User already exists!');
    }

    const salt = randomBytes(4).toString('hex');
    const hash = (await script(body.password, salt, 16)) as Buffer;
    const hashedPassword = `${salt}.${hash.toString('hex')}`;

    const createUser = await this.service.create(
      body.email,
      hashedPassword,
      body?.admin || false,
    );

    if (!createUser) {
      throw new BadRequestException('Unable to create user.');
    }

    return createUser;
  }

  async signin(email: string, password: string) {
    const user = await this.service.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not Found');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await script(password, salt, 16)) as Buffer;
    if (hash.toString('hex') !== storedHash) {
      throw new BadRequestException('Invalid Credentials');
    }

    return user;
  }
}
