import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-z0-9]*$/, {
    message: '비밀번호는 숫자, 영문자만 사용 가능합니다.',
  })
  password: string;
}
