import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const createdUser: Promise<User> =
      this.userRepository.createUser(authCredentialsDto);

    return createdUser
      .then((user) => this.userRepository.save(user))
      .catch((error) => {
        if (error.code === '23505') {
          throw new ConflictException('이미 존재하는 username입니다.');
        } else {
          throw new InternalServerErrorException();
        }
      });
  }

  public async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findByUsername(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'login success';
    }
    throw new UnauthorizedException('비밀번호 혹은 아이디를 확인해주세요.');
  }
}
