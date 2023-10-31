import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardRepository } from './board.repository';
import { AuthModule } from 'src/auth/auth.module';
//import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  //imports: [TypeOrmModule.forFeature([BoardRepository])],
  //BoardRepository를 다른곳에서도 사용하게 import
  //BoardRepository는 TypeORM 0.3.0 이후 버전부터 @EntityRepository 사용이 불가하기 때문에 Injectable로 설정하여 providers에 넣었다.
  imports: [AuthModule],
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository]
})
export class BoardsModule {}
