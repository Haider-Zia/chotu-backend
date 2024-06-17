import { EntityBase } from 'src/common/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ConversationTypeEnum } from '../enums/conversationType.enum';
import { ConversationParticipant } from './conversationParticipant.entity';
import { Message } from './message.entity';

@Entity()
export class Conversation extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(
    () => ConversationParticipant,
    (participant) => participant.conversation,
  )
  participants: ConversationParticipant[];

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  @Column({ nullable: true, default: null })
  name: string | null = null;

  @Column({
    type: 'enum',
    enum: ConversationTypeEnum,
    default: ConversationTypeEnum.STANDARD,
  })
  type: ConversationTypeEnum = ConversationTypeEnum.STANDARD;
}
