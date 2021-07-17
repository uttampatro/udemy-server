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
    id: number;

    @Column({ nullable: true })
    imageUrl: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @ManyToOne(() => User)
    createdBy: User;

    @OneToMany(() => CourseTopic, courseTopic => courseTopic.course)
    courseTopic: CourseTopic[];

    @OneToMany(() => Cart, cart => cart.courses)
    cart: Cart;

    @CreateDateColumn()
    @Index()
    createdAt: Date;
}
