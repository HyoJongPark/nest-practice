import { DataSource, Repository } from 'typeorm';
import { Board } from './entity/board.entity';
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './entity/board-status.enum';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  createBoard(createBoardDto: CreateBoardDto): Board {
    const { title, description } = createBoardDto;

    return this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });
  }

  async findById(id: number): Promise<Board> {
    return await this.createQueryBuilder('board')
      .where('board.id = :id', { id })
      .getOne();
  }
}
