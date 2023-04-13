import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './create-board.dto';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }

    getBoardById(id: string): Board {
        return this.boards.find((board) => board.id === id);
    }

    createBoard(createBoardDto: CreateBoardDto): Board {
        const { title, description } = createBoardDto;

        const created = {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC,
        };

        this.boards = [...this.boards, created];

        return created;
    }

    updateStatusById(id: string, status: BoardStatus): Board {
        const found = this.getBoardById(id);

        found.status = status;

        return found;
    }

    deleteBoardById(id: string): Board {
        const found = this.getBoardById(id);

        this.boards = [...this.boards].filter((board) => board.id !== id);

        return found;
    }
}