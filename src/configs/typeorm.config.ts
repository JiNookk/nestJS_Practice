import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Board } from 'src/boards/board.entity';
import { User } from 'src/users/user.entity';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeORMconfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.databse,
    entities: [__dirname + '../**/*.entity.{js,ts}', Board, User],
    synchronize: dbConfig.synchronize,
};
