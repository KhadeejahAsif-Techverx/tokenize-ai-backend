import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '@requestable-dto/user/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Hash a password
   * @param password - The plain text password
   * @returns Promise<string> - The hashed password
   */
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Validate user password
   * @param password - The plain text password
   * @param hashedPassword - The hashed password to compare against
   * @returns Promise<boolean> - True if password matches
   */
  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email: email.toLowerCase().trim() },
    });
  }

  async create(payload: CreateUserDto) {
    const { email, password } = payload;

    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(`User with email ${email} already exists`);
    }

    let hashedPassword: string = '';

    // Hash password if provided
    if (password) {
      hashedPassword = await this.hashPassword(password);
    }

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async updatePassword(userId: string, password: string) {
    const hashPassword = await this.hashPassword(password);
    return await this.userRepository.update(
      { id: userId },
      { password: hashPassword },
    );
  }

  async findAll() {
    return { user: [] };
  }
}
