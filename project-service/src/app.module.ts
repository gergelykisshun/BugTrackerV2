import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from './project/project.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://project_service_db:27017', {
      autoCreate: true,
      user: 'admin',
      pass: 'nimda',
      dbName: 'project-service-db',
    }),
    ProjectModule,
    TicketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
