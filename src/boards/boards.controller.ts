import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './boards.model';
import { CreateBoardDto } from './create-board.dto';
import { BoardStatusValidationPipe } from './boards.status-validation.pipe';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get('/')
    getAllBoards(): Board[] {
        return this.boardsService.getAllBoards();
    }

    @Post('/')
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Board {
        return this.boardsService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: string): Board {
        return this.boardsService.getBoardById(id);
    }

    @Patch('/:id/status')
    updateBoardStatusById(
        @Param('id') id: string,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    ): Board {
        return this.boardsService.updateStatusById(id, status);
    }

    @Delete('/:id')
    deleteBoardById(@Param('id') id: string): Board {
        return this.boardsService.deleteBoardById(id);
    }
}
