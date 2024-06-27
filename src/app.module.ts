import { Module } from '@nestjs/common';
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
import { typeOrmModuleOptions } from 'ormConfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmModuleOptions),
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
