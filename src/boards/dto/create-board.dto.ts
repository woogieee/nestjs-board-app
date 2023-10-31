import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  //계층과 데이터 교환을 위한 객체
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
