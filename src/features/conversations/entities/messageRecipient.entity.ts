import { EntityBase } from 'src/common/base.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MessageRecipientStatusEnum } from '../enums/messageRecipientStatus.enum';
import { Message } from './message.entity';
import { ConversationParticipant } from './conversationParticipant.entity';
import { Notification } from 'src/features/notifications/entities/notification.entity';

@Entity()
export class MessageReceipt extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Message, (message) => message.recipients, {
    nullable: false,
  })
  message: Message;

  @ManyToOne(
    () => ConversationParticipant,
    (participant) => participant.messagesReceived,
    {
      nullable: false,
    },
  )
  recipient: ConversationParticipant;

  @OneToMany(() => Notification, (notification) => notification.messageReceipt)
  notifications: Notification[];

  @Column({
    type: 'enum',
    enum: MessageRecipientStatusEnum,
    default: MessageRecipientStatusEnum.SENT,
  })
  status: MessageRecipientStatusEnum = MessageRecipientStatusEnum.SENT;
}
