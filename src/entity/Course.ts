import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    Index,
    OneToMany,
    BaseEntity,
    JoinColumn,
} from 'typeorm';
import { Cart } from './Cart';
import { CourseTopic } from './CourseTopic';
import { User } from './User';
@Entity('course')
export class Course extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    imageUrl: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    price: string;

    @ManyToOne(() => User)
    createdBy: User;

    @OneToMany(() => CourseTopic, courseTopic => courseTopic.course)
    courseTopic: CourseTopic[];

    @ManyToOne(() => Cart, cart => cart.courses)
    cart: Cart;

    @CreateDateColumn()
    @Index()
    createdAt: Date;
}
