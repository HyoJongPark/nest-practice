import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.model';
import { CreateBoardDto } from './create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  public getAllBoard(): Board[] {
    return this.boardsService.getAllBoard();
  }

  @Get('/:id')
  public getBoardById(@Param('id') id: string): Board {
    return this.boardsService.getBoardById(id);
  }

  @Post()
  public createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoard(createBoardDto);
  }
}
