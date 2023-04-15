import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Board } from 'src/boards/board.entity';
import { User } from 'src/users/user.entity';

export const typeORMconfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5431,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: [__dirname + '../**/*.entity.{js,ts}', Board, User],
    synchronize: true,
};
