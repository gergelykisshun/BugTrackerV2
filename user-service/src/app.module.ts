import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProjectController } from './project/project.controller';
import { ProjectService } from './project/project.service';
import { ProjectModule } from './project/project.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'user_service_db',
      port: 5432,
      username: 'admin',
      password: 'nimda',
      database: 'bug-tracker-user',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    HttpModule,
    ProjectModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class AppModule {}
