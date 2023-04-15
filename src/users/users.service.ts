import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { AuthCredentialDto } from './user.auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signup(authCredentialDto: AuthCredentialDto): Promise<User> {
        const { username, password } = authCredentialDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const created = await this.userRepository.create({
            username,
            password: hashedPassword,
        });

        try {
            const saved = await this.userRepository.save(created);

            return saved;
        } catch (e) {
            if (e.code === '23505') {
                throw new ConflictException(
                    `username ${username} already exist!`,
                );
            }

            throw new InternalServerErrorException();
        }
    }

    async login(
        authCredentialDto: AuthCredentialDto,
    ): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialDto;

        const found = await this.userRepository.findOne({ username });

        if (found && (await bcrypt.compare(password, found.password))) {
            const payload = { username };
            const accessToken = this.jwtService.sign(payload);

            return { accessToken };
        }

        throw new UnauthorizedException('login failed');
    }
}
