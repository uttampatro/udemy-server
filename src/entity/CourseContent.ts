import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseTopic } from './CourseTopic';
import { User } from './User';

export interface ICourseContent {
    type: CourseContentType;
    text: string;
    videoUrl: string;
    imageUrl: string;
}

export enum CourseContentType {
    TEXT = 1,
    IMAGE = 2,
    VIDEO = 3,
}

@Entity('courseContent')
export class CourseContent extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('json')
    data: ICourseContent;

    @Column({ nullable: true })
    sequence: number;

    @Column({ nullable: true })
    title: string;

    @Column('uuid')
    topicId: string;

    @ManyToOne(() => CourseTopic)
    topic: CourseTopic;

    @ManyToOne(() => User)
    createdBy: User;

    @CreateDateColumn()
    @Index()
    createdAt: Date;
}

// [{"type":1,"text":"Welcome to Intro","videoUrl":"","imageUrl":""}]
