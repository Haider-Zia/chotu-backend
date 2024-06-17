import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostLocation } from './entities/postLocation.entity';
import { Case } from './entities/case.entity';
import { Tag } from './entities/tag.entity';
import { Queue } from './entities/queue.entity';
import { QueueApplicant } from './entities/queueApplicant.entity';
import { QueueQuestion } from './entities/queueQuestion.entity';
import { QueueAnswer } from './entities/queueAnswer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Post,
      PostLocation,
      Case,
      Tag,
      Queue,
      QueueApplicant,
      QueueQuestion,
      QueueAnswer,
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
