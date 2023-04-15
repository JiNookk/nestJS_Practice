import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './boardstatus.enum';
import { CreateBoardDto } from './create-board.dto';
import { BoardStatusValidationPipe } from './boards.status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    private logger = new Logger('BoardsController');

    constructor(private boardsService: BoardsService) {}

    @Post('/')
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto,
        @GetUser() user: User,
    ): Promise<Board> {
        this.logger.verbose(
            `User ${user.username} is trying to create board
        Payload: ${JSON.stringify(createBoardDto)}`,
        );

        return this.boardsService.createBoard(createBoardDto, user);
    }

    @Get('/')
    getAllBoards(@GetUser() user: User): Promise<Board[]> {
        this.logger.verbose(
            `User ${user.username} is trying to get all boards`,
        );

        return this.boardsService.getAll(user);
    }

    @Get('/:id')
    getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    @Patch('/:id/status')
    updateBoardStatusById(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    ): Promise<Board> {
        return this.boardsService.updateStatusById(id, status);
    }

    @Delete('/:id')
    deleteBoardById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<void> {
        return this.boardsService.deleteBoardById(id, user);
    }
}
