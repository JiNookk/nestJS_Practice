import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boardstatus.enum';
import { CreateBoardDto } from './create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ) {}

    async getAll(user: User): Promise<Board[]> {
        const query = this.boardRepository.createQueryBuilder('board');

        query.where('board.userId = :userId', { userId: user.id });

        const boards = await query.getMany();

        return boards;
    }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`board is not found with id: ${id}`);
        }

        return found;
    }

    async createBoard(
        createBoardDto: CreateBoardDto,
        user: User,
    ): Promise<Board> {
        const { title, description } = createBoardDto;

        const created = await this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user,
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

    async deleteBoardById(id: number, user: User): Promise<void> {
        const deleted = await this.boardRepository.delete({ id, user });

        if (deleted.affected === 0) {
            throw new NotFoundException(`board is not found with id: ${id}`);
        }
    }
}
