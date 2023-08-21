import { Injectable } from '@nestjs/common';
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
    const user: User = this.userRepository.createUser(authCredentialsDto);

    return await this.userRepository.save(user);
  }
}
