import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { ApiController } from './api/api.controller';
import { UsersModule } from './users/users.module';
import { AuthGuard } from './auth-guard/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { EventsModule } from './events/events.module';

const config = ConfigModule.forRoot({
  envFilePath: (process.env.NODE_ENV === 'stage') ? '.stage.env' : '.development.env'
})
const typeOrmModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
})
@Module({
  imports: [BoardModule, UsersModule, config, typeOrmModule, EventsModule],
  controllers: [AppController, ApiController],
  providers: [AppService, AuthGuard,],
})
export class AppModule { }
