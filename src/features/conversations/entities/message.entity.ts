import { EntityBase } from 'src/common/entities/base.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ConversationParticipant } from './conversationParticipant.entity';
import { Conversation } from './conversation.entity';
import { MessageReceipt } from './messageRecipient.entity';
import { Report } from 'src/features/reports/entities/report.entity';
import { Media } from 'src/shared/media/entities/media.entity';
import { MessageTypeEnum } from '../enums/messageType.enum';

@Entity()
export class Message extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ConversationParticipant, (sender) => sender.messagesSent, {
    nullable: false,
  })
  sender: ConversationParticipant;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages, {
    nullable: false,
  })
  conversation: ConversationParticipant;

  @OneToMany(() => MessageReceipt, (recipient) => recipient.message)
  recipients: MessageReceipt[];

  @OneToMany(() => Report, (report) => report.message)
  reports: Report[];

  @OneToMany(() => Media, (media) => media.message)
  media: Media[];

  @Column({ nullable: true, default: null })
  text: string | null = null;

  @Column({
    type: 'enum',
    enum: MessageTypeEnum,
    default: MessageTypeEnum.TEXT,
  })
  type: MessageTypeEnum = MessageTypeEnum.TEXT;

  @BeforeInsert()
  @BeforeUpdate()
  prohibitEmptyText() {
    if (this.type === MessageTypeEnum.TEXT && this.text == null) {
      throw new Error('Text messages must contain text.');
    }
  }
}
