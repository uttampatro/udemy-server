import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from './Course';
import { CourseContent } from './CourseContent';
import { User } from './User';

@Entity('courseTopic')
export class CourseTopic extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('uuid')
    courseId: string;

    @ManyToOne(() => Course)
    course: Course;

    @ManyToOne(() => User)
    createdBy: User;

    @OneToMany(() => CourseContent, courseContent => courseContent.topic)
    courseContent: CourseContent[];

    @CreateDateColumn()
    @Index()
    createdAt: Date;
}
