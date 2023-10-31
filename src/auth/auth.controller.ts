import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //회원가입
  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  //로그인
  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  //토큰으로 유저정보 가져오기
  @Post('/test')
  @UseGuards(AuthGuard())
  //@UseGuards(AuthGuard())가 되어있어야 req 객체에 user 객체가 들어있음.
  test(@GetUser() user: User) {
    console.log('user', user);
  }
}
