import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardRepository } from './board.repository';
//import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  //imports: [TypeOrmModule.forFeature([BoardRepository])],
  imports: [],
  //BoardRepository를 다른곳에서도 사용하게 import
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository],
})
export class BoardsModule {}
