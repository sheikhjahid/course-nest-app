import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Session,
  UseGuards,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/user.interceptor';
import { AuthService } from './auth.service';
import { currentUser } from './decorators/current-user.decorator';
import { SignUp } from './dtos/signup.dto';
import { updateUser } from './dtos/updateUser.dto';
import { User } from './dtos/user.dto';
import { AuthGuard } from './guards/auth.guard';
import { UserService } from './user.service';

@Controller('auth')
@Serialize(User)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() body: SignUp, @Session() session: any) {
    const user = await this.authService.signup(body);
    session.userId = user.id;
    return user;
  }

  @Post('signin')
  async signin(@Body() body: SignUp, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('signout')
  signout(@Session() session: any) {
    delete session?.userId;
  }

  @Get('whoami')
  @UseGuards(AuthGuard)
  getCurrentUser(@currentUser() user: User) {
    return user;
  }

  @Put('user/:id')
  update(@Param('id') id: string, @Body() body: updateUser) {
    return this.userService.update(+id, body);
  }

  @Get('users')
  find() {
    return this.userService.find();
  }

  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Delete('user/:id')
  delete(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}
