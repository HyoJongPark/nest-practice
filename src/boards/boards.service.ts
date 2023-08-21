import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './entity/board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entity/board.entity';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  public async getAllBoard(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  public async createBoard(createBoardDto: CreateBoardDto) {
    const board: Board = this.boardRepository.createBoard(createBoardDto);

    await this.boardRepository.save(board);
    return board;
  }

  public async getBoardById(id: number): Promise<Board> {
    const foundBoard = await this.boardRepository.findById(id);

    if (!foundBoard) {
      throw new NotFoundException('존재하지 않는 게시글입니다.');
    }

    return foundBoard;
  }

  public async updateBoardStatusById(
    id: number,
    status: BoardStatus,
  ): Promise<Board> {
    const foundBoard = await this.getBoardById(id);

    foundBoard.status = status;
    await this.boardRepository.save(foundBoard);

    return foundBoard;
  }

  public async deleteBoardById(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('존재하지 않는 게시글입니다.');
    }
  }
}
