import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRelation } from './types/userRelation.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Email } from './entities/email.entity';
import { PhoneNumber } from './entities/phoneNumber.entity';
import { User } from './entities/user.entity';
import { buildNestedJoinsRelationsArray } from 'src/common/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Email)
    private emailRepository: Repository<Email>,
    @InjectRepository(PhoneNumber)
    private phoneNumberRepository: Repository<PhoneNumber>,
  ) {}

  createUserWithEmailAndPassword = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<User> => {
    try {
      const emailInstance = this.emailRepository.create({
        email,
      });

      const user = this.userRepository.create({
        password: password,
        emails: [emailInstance],
      });

      return await this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  };

  createUserWithPhoneNumberAndPassword = async ({
    phoneNumber,
    password,
  }: {
    phoneNumber: string;
    password: string;
  }): Promise<User> => {
    try {
      const phoneNumberInstance = this.phoneNumberRepository.create({
        phoneNumber,
      });

      const user = this.userRepository.create({
        password: password,
        phoneNumbers: [phoneNumberInstance],
      });

      return await this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  };

  findUserByEmailOrFail = async ({
    email,
    userRelations = [],
  }: {
    email: string;
    userRelations: UserRelation[];
  }) => {
    const relations = buildNestedJoinsRelationsArray<User>({
      entity: User,
      relations: userRelations,
    });
    const userEmail = await this.emailRepository.findOneOrFail({
      where: { email },
      relations,
    });
    return userEmail.user;
  };

  async findUserByPhoneNumberOrFail({
    phoneNumber,
    userRelations = [],
  }: {
    phoneNumber: string;
    userRelations: UserRelation[];
  }) {
    const relations = buildNestedJoinsRelationsArray<User>({
      entity: User,
      relations: userRelations,
    });
    const userPhoneNumber = await this.phoneNumberRepository.findOneOrFail({
      where: { phoneNumber },
      relations,
    });
    return userPhoneNumber.user;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
