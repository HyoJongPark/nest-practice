import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
  private boards = []; //TODO: DB로 교체

  public getAllBoard() {
    return this.boards;
  }
}
