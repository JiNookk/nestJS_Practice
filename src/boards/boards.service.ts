import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boardstatus.enum';
import { CreateBoardDto } from './create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ) {}

    async getAll(): Promise<Board[]> {
        const boards = await this.boardRepository.find();

        return boards;
    }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`board is not found with id: ${id}`);
        }

        return found;
    }

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const { title, description } = createBoardDto;

        const created = await this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
        });

        const saved = await this.boardRepository.save(created);

        return saved;
    }

    async updateStatusById(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);

        if (!board) {
            throw new NotFoundException(`board is not found with id: ${id}`);
        }

        board.status = status;

        await this.boardRepository.save(board);

        return board;
    }

    async deleteBoardById(id: number): Promise<void> {
        const deleted = await this.boardRepository.delete(id);

        if (deleted.affected === 0) {
            throw new NotFoundException(`board is not found with id: ${id}`);
        }

        console.log(deleted);
    }
}
