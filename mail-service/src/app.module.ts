import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mail_db:27017', {
      autoCreate: true,
      user: 'admin',
      pass: 'nimda',
      dbName: 'mail-service-db',
    }),
    MailerModule.forRoot({
      preview: true,
      transport: {
        host: 'mailhog',
        port: 1025,
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
