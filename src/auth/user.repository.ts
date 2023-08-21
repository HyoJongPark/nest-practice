import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async createUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return this.create({ username, password: hashedPassword });
  }
}
