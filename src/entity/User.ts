import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    OneToMany,
    BaseEntity,
} from 'typeorm';
import { Cart } from './Cart';
import { Course } from './Course';

@Entity('user')
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Course, course => course.name)
    course: Course[];

    // @OneToMany(() => Cart, cart => cart.user)
    // cart: Cart[];
}
