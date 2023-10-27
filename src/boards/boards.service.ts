import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
//uuid 버전1을 사용하면서 이름은 uuid로 하겠다

@Injectable()
export class BoardsService {
  private boards: Board[] = [];
  //다른 컴포넌트에서 boards 배열값을 수정하지 못하게 private 사용
  //boards는 배열로 되어있기 때문에 타입을 Board [] 배열로 지정해 줘야 됨

  getAllBoards(): Board[] {
    //리턴값도 배열로 받아야되기 때문에 타입을 지정해 줌
    return this.boards;
  }

  //게시글 작성
  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    const board: Board = {
      //ID는 유니크 해야되는데 DB에 데이터를 넣을경우 DB가 유니크한 값을 자동으로 주지만 현재는 DB를 안쓰기 때문에 임의로 값을 줘야된다. 이땐 uuid 모듈을 이용해서 유니크한 값을 준다.
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  //아이디로 게시글 가져오기
  getBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id);
  }

  //아이디로 게시글 삭제
  deleteBoard(id: string): void {
    this.boards = this.boards.filter((board) => board.id !== id);
    //아이디가 다른것만 남겨준다
  }

  //특정 게시글 업데이트
  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
