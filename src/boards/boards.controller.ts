import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
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

  @Patch('/:id/status')
  public updateBoardStatusById(
    @Param('id') id: string,
    @Body('status') status: BoardStatus,
  ): Board {
    return this.boardsService.updateBoardStatusById(id, status);
  }

  @Delete('/:id')
  public deleteBoardById(@Param('id') id: string): void {
    this.boardsService.deleteBoardById(id);
  }
}
