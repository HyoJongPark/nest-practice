import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../entity/board.model';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  transform(value: any): BoardStatus {
    value = value.toUpperCase();

    if (!this.isValidStatus(value)) {
      throw new BadRequestException(
        `게시글은 PRIVATE or PUBLIC 상태여야합니다.`,
      );
    }

    return value;
  }

  isValidStatus(value: any): boolean {
    return this.StatusOptions.includes(value);
  }
}
