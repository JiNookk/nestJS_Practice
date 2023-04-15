import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMconfig } from './configs/typeorm.config';
import { UsersModule } from './users/users.module';

@Module({
    imports: [TypeOrmModule.forRoot(typeORMconfig), BoardsModule, UsersModule],
})
export class AppModule {};
