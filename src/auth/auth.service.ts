import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './entity/user.entity';

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
}
