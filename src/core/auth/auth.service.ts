import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/features/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  // async signUp(signUpDto: SignUpDto) {
  //   const user = this.userRepository.create({
  //     name: signUpDto.userName,
  //     password: signUpDto.password,
  //   });
  //   await this.userRepository.save(user);
  //   return user;
  // }

  // signIn(signInDto: SignInDto) {
  //   return 'Sign In';
  // }
}
