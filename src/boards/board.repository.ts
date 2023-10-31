import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';

//@EntityRepository(Board)  TypeORM 0.3.0 이후 버전으로 사용 불가능
@Injectable()
//사용자 정의 저장소로 선언
export class BoardRepository extends Repository<Board> {
  //Repository를 상속받아야 Find, Insert, Delete등 엔티티를 컨트롤 할 수 있다.

  //Injectable 변경으로 인한 코드 추가 시작
  constructor(dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }
  //Injectable 변경으로 인한 코드 추가 종료

  async getBoardById(id: number) {
    return await this.findOneBy({ id });
  }

  //게시판 생성 Service 가져오기 시작
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC
    });

    await this.save(board);
    return board;
  }
  //게시판 생성 Service 가져오기 종료
}
