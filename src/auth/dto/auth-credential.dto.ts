import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  //계층과 데이터 교환을 위한 객체

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  //영어랑 숫자만 입력 가능하게
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accepts english and number'
  })
  password: string;
}
