import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository extends Repository<User> {
  //@EntityRepository(User) -> @Injectable() 변경으로 인한 코드 추가 시작
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  //@EntityRepository(User) -> @Injectable() 변경으로 인한 코드 추가 종료

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    //비밀번호 암호화 시작
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    //비밀번호 암호화 종료

    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      //유저이름 중복시 에러문구 시작
      if (error.code === '23505') {
        //중복값 에러를 콘솔로그로 찍어보면 에러코드 23505가 표시됨
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }
    //유저이름 중복시 에러문구 종료
  }
}
