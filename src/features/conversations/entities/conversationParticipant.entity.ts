import { EntityBase } from 'src/common/base.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ConversationParticipantRolesEnum } from '../enums/conversationParticipantRoles.enum';
import { Conversation } from './conversation.entity';
import { User } from 'src/features/users/entities/user.entity';
import { Message } from './message.entity';
import { MessageReceipt } from './messageRecipient.entity';

@Entity()
export class ConversationParticipant extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (participant) => participant.conversations, {
    nullable: false,
  })
  participant: Conversation;

  @ManyToOne(() => Conversation, (conversation) => conversation.participants, {
    nullable: false,
  })
  conversation: Conversation;

  @OneToMany(() => Message, (message) => message.sender)
  messagesSent: Message[];

  @OneToMany(() => MessageReceipt, (receipt) => receipt.recipient)
  messagesReceived: MessageReceipt[];

  @Column({
    type: 'enum',
    enum: ConversationParticipantRolesEnum,
    default: ConversationParticipantRolesEnum.STANDARD,
  })
  role: ConversationParticipantRolesEnum =
    ConversationParticipantRolesEnum.STANDARD;
}
