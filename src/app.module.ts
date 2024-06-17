import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './features/users/users.module';
import { BusinessesModule } from './features/businesses/businesses.module';
import { LocationsModule } from './features/locations/locations.module';
import { ReportsModule } from './features/reports/reports.module';
import { MediaModule } from './shared/media/media.module';
import { NotificationsModule } from './features/notifications/notifications.module';
import { ConversationsModule } from './features/conversations/conversations.module';
import { PostsModule } from './features/posts/posts.module';
import { CommentsModule } from './features/comments/comments.module';
import { ReviewsModule } from './features/reviews/reviews.module';
import { AuthModule } from './core/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from './features/transactions/transactions.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: !(process.env.ENV == 'production'), // Set to false in production
    }),
    UsersModule,
    BusinessesModule,
    LocationsModule,
    ReportsModule,
    MediaModule,
    NotificationsModule,
    ConversationsModule,
    PostsModule,
    CommentsModule,
    ReviewsModule,
    AuthModule,
    TransactionsModule,
  ],
})
export class AppModule {}
