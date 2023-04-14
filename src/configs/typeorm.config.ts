import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMconfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5431,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: [__dirname + '../**/*.entity.{js,ts}'],
    synchronize: true,
};
