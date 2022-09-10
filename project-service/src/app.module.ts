import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      autoCreate: true,
      user: 'admin',
      pass: 'nimda',
      dbName: 'project-service-db',
    }),
    ProjectModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
