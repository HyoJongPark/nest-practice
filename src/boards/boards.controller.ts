import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.model';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  public getAllBoard(): Board[] {
    return this.boardsService.getAllBoard();
  }

  @Post()
  public createBoard(
    @Body('title') title,
    @Body('description') description,
  ): Board {
    return this.boardsService.createBoard(title, description);
  }
}
