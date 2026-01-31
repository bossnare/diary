import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProfilesModule } from './profiles/profiles.module.js';
import { NotesModule } from './notes/notes.module.js';
import { NotificationsModule } from './notifications/notifications.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module.js';
import { SearchsModule } from './searchs/searchs.module.js';
import { ScheduleModule } from '@nestjs/schedule';
import { JobsModule } from './jobs/jobs.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    JobsModule,
    AuthModule,
    PrismaModule,
    ProfilesModule,
    NotesModule,
    NotificationsModule,
    SearchsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
