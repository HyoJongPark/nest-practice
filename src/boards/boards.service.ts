import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './entity/board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

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
    const foundBoard = this.boards.find((board) => board.id === id);

    if (!foundBoard) {
      throw new NotFoundException('게시글이 존재하지 않습니다.');
    }

    return foundBoard;
  }

  updateBoardStatusById(id: string, status: BoardStatus): Board {
    const foundBoard = this.getBoardById(id);

    foundBoard.status = status;

    return foundBoard;
  }

  deleteBoardById(id: string): Board {
    const foundBoard = this.getBoardById(id);

    this.boards = this.boards.filter((board) => board.id !== id);

    return foundBoard;
  }
}
