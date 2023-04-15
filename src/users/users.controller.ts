import {
    Body,
    Controller,
    Post,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthCredentialDto } from './user.auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('/signup')
    @UsePipes(ValidationPipe)
    async signup(@Body() authCredentialDto: AuthCredentialDto) {
        return this.usersService.signup(authCredentialDto);
    }

    @Post('/signin')
    async signin(
        @Body() authCredentialDto: AuthCredentialDto,
    ): Promise<{ accessToken: string }> {
        return this.usersService.login(authCredentialDto);
    }

    @Post('/authTest')
    @UseGuards(AuthGuard())
    authTest(@GetUser() user: User) {
        console.log(user);
    }
}
