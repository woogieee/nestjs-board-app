import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';
//uuid 버전1을 사용하면서 이름은 uuid로 하겠다

@Injectable()
export class BoardsService {
  // private boards: Board[] = [];
  // //다른 컴포넌트에서 boards 배열값을 수정하지 못하게 private 사용
  // //boards는 배열로 되어있기 때문에 타입을 Board [] 배열로 지정해 줘야 됨
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}
  //InjectRepository를 이용해서 이 서비스에서 BoardRepository를 이용함

  // getAllBoards(): Board[] {
  //   //리턴값도 배열로 받아야되기 때문에 타입을 지정해 줌
  //   return this.boards;
  // }
  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  // //게시글 작성
  // createBoard(createBoardDto: CreateBoardDto) {
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     //ID는 유니크 해야되는데 DB에 데이터를 넣을경우 DB가 유니크한 값을 자동으로 주지만 현재는 DB를 안쓰기 때문에 임의로 값을 줘야된다. 이땐 uuid 모듈을 이용해서 유니크한 값을 준다.
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }
  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  // //아이디로 게시글 가져오기
  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`검색 아이디가 없습니다.${id}`);
  //   }
  //   return found;
  // }
  async getBoardById(id: number): Promise<Board> {
    // const found = await this.boardRepository.findOne({ where: { id } });
    const found = await this.boardRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  // //아이디로 게시글 삭제
  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   //getBoardById로 아이디 검색 후 삭제
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  //   //아이디가 다른것만 남겨준다
  // }
  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  // //특정 게시글 업데이트
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;

    await this.boardRepository.save(board);
    return board;
  }
}
