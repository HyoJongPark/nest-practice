import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = []; //TODO: DB로 교체

  public getAllBoard(): Board[] {
    return this.boards;
  }

  public createBoard(createBoardDto: CreateBoardDto) {
    const board: Board = {
      id: uuid(),
      title: createBoardDto.title,
      description: createBoardDto.description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  public getBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id);
  }
}
