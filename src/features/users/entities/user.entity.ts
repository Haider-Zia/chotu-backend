import { City } from 'src/features/locations/entities/city.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserLocation } from './userLocation.entity';
import { EntityBase } from 'src/common/entities/base.entity';
import { UserStatusEnum } from '../enums/userStatus.enum';
import { PhoneNumber } from './phoneNumber.entity';
import { Email } from './email.entity';
import { Role } from './role.entity';
import { WorkingHours } from 'src/features/businesses/entities/workingHours.entity';
import { ClosedTime } from 'src/features/businesses/entities/closedTime.entity';
import { Address } from 'src/features/businesses/entities/address.entity';
import { BusinessCategory } from 'src/features/businesses/entities/businessCategory.entity';
import { Post } from 'src/features/posts/entities/post.entity';
import { Service } from 'src/features/businesses/entities/service.entity';
import { QueueApplicant } from 'src/features/posts/entities/queueApplicant.entity';
import { BankAccount } from './bankAccount.entity';
import { Comment } from 'src/features/comments/entities/comment.entity';
import { Review } from 'src/features/reviews/entities/review.entity';
import { Report } from 'src/features/reports/entities/report.entity';
import { Media } from 'src/shared/media/entities/media.entity';
import { ConversationParticipant } from 'src/features/conversations/entities/conversationParticipant.entity';
import { Moderation } from 'src/features/reports/entities/moderation.entity';
import { UserNotification } from 'src/features/notifications/entities/userNotification.entity';

@Entity()
export class User extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true }) // nullable to allow future third party auth
  password: string | null = null;

  @Column({
    type: 'enum',
    enum: UserStatusEnum,
    default: UserStatusEnum.CREATED,
  })
  status: UserStatusEnum = UserStatusEnum.CREATED;

  @ManyToOne(() => City, (city) => city.users, { nullable: true })
  city: City;

  @ManyToMany(() => Service, (service) => service.businesses)
  @JoinTable({
    name: 'business_service',
    joinColumn: { name: 'businessId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'serviceId', referencedColumnName: 'id' },
  })
  services: Service[];

  @OneToMany(() => UserLocation, (userLocation) => userLocation.user)
  locations: UserLocation[];

  @OneToMany(() => PhoneNumber, (phoneNumber) => phoneNumber.user, {
    cascade: ['insert'],
  })
  phoneNumbers: PhoneNumber[];

  @OneToMany(() => Email, (email) => email.user, { cascade: ['insert'] })
  emails: Email[];

  @OneToMany(() => Role, (userRole) => userRole.user)
  roles: Role[];

  @OneToMany(() => WorkingHours, (workingHours) => workingHours.business)
  workingHours: WorkingHours[];

  @OneToMany(() => ClosedTime, (closedTime) => closedTime.business)
  closedTimes: ClosedTime[];

  @OneToMany(() => Address, (address) => address.business)
  addresses: Address[];

  @OneToMany(
    () => BusinessCategory,
    (businessCategory) => businessCategory.business,
  )
  categories: BusinessCategory[];

  @OneToMany(() => Post, (post) => post.poster)
  posts: Post[];

  @OneToMany(() => QueueApplicant, (queueApplicant) => queueApplicant.applicant)
  queueApplications: QueueApplicant[];

  @OneToMany(() => BankAccount, (bankAccount) => bankAccount.owner)
  bankAccounts: BankAccount[];

  @OneToMany(() => Comment, (comment) => comment.commenter)
  comments: Comment[];

  @OneToMany(() => Review, (review) => review.reviewer)
  reviewsLeft: Review[];

  @OneToMany(() => Review, (review) => review.reviewee)
  reviewsReceived: Review[];

  @OneToMany(() => Report, (report) => report.reportee)
  reportsReceived: Report[];

  @OneToMany(() => Report, (report) => report.reporter)
  reportsFiled: Report[];

  @OneToMany(() => Moderation, (moderation) => moderation.moderator)
  moderationsApplied: Moderation[];

  @OneToMany(() => UserNotification, (notification) => notification.user)
  notifications: UserNotification[];

  @OneToMany(
    () => ConversationParticipant,
    (conversationParticipant) => conversationParticipant.participant,
  )
  conversations: ConversationParticipant[];

  @OneToOne(() => Media, (profilePicture) => profilePicture.user)
  profilePicture: Media | null = null;
}
