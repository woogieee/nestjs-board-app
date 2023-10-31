import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  //회원가입
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  //로그인
  async signIn(
    authCredentialsDto: AuthCredentialsDto
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;

    //유저가 있는지 검색
    const user = await this.userRepository.findOneBy({ username });

    //입력한 패스워드와 DB에 저장된 유저 비밀번호가 같은지 체크
    if (user && (await bcrypt.compare(password, user.password))) {
      //유저 토큰 생성 ( Secret + Payload )가 필요함
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);
      //Secret + payload로 accessToken을 만들어줌

      return { accessToken };
      //accessToken을 객체로 리턴해줌
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
