import { User } from '../../entity/User';
import { Course } from '../../entity/Course';
import {
    AddToCartDTO,
    CreateCourseContentDTO,
    CreateCourseDTO,
    CreateTopicDTO,
    FindContentListDTO,
    FindCourseDTO,
    FindTopicListDTO,
} from './CourseDTO';
import { CourseTopic } from '../../entity/CourseTopic';
import { CourseContent } from '../../entity/CourseContent';
import { Cart } from '../../entity/Cart';

class CourseService {
    async createCourse(dto: CreateCourseDTO) {
        const { userId, imageUrl, name, price } = dto;
        const user = await User.findOne({
            where: { id: userId },
        });
        const course = new Course();
        course.imageUrl = imageUrl;
        course.name = name;
        course.createdBy = user!;
        course.price = price;
        await course.save();
        return course;
    }
    async createTopic(dto: CreateTopicDTO) {
        const { name, sequence, courseId, userId } = dto;
        const user = await User.findOne({
            where: { id: userId },
        });
        const course = await Course.findOne({
            where: { id: courseId },
        });
        const topic = new CourseTopic();
        topic.name = name;
        topic.sequence = sequence;
        topic.createdBy = user!;
        topic.courseId = courseId;
        topic.course = course!;
        await topic.save();
        return topic;
    }
    async createCourseContent(dto: CreateCourseContentDTO) {
        const { title, sequence, data, topicId, userId } = dto;
        const { type, text, imageUrl, videoUrl } = data;
        const user = await User.findOne({
            where: { id: userId },
        });
        const topic = await CourseTopic.findOne({
            where: { id: topicId },
        });
        const courseContent = new CourseContent();
        const contentData = {
            type,
            text,
            imageUrl,
            videoUrl,
        };
        courseContent.data = contentData;
        courseContent.sequence = sequence;
        courseContent.title = title;
        courseContent.topicId = topicId;
        courseContent.topic = topic!;
        courseContent.createdBy = user!;
        await courseContent.save();
        return courseContent;
    }
    async getAllCourseList() {
        const courseList = await Course.createQueryBuilder('course')
            .leftJoinAndSelect('course.courseTopic', 'courseTopic')
            .leftJoinAndSelect('course.createdBy', 'createdBy')
            .orderBy('course.createdAt', 'ASC')
            .select('course.id')
            .addSelect('course.imageUrl')
            .addSelect('course.name')
            .addSelect('course.price')
            .addSelect('courseTopic.id')
            .addSelect('courseTopic.name')
            .addSelect('createdBy.id')
            .addSelect('createdBy.username')
            .getMany();
        return courseList;
    }
    async getCourse(dto: FindTopicListDTO) {
        const { courseId } = dto;
        const course = await Course.createQueryBuilder('course')
            .leftJoinAndSelect('course.createdBy', 'createdBy')
            .where('course.id = :id', {
                id: courseId,
            })
            .select('course.id')
            .addSelect('course.name')
            .addSelect('course.price')
            .addSelect('course.imageUrl')
            .addSelect('createdBy.username')
            .getOne();
        return course;
    }
    async getTopicListByCourseId(dto: FindTopicListDTO) {
        const { courseId } = dto;
        const topicList = await CourseTopic.createQueryBuilder('courseTopic')
            .leftJoinAndSelect('courseTopic.course', 'course')
            .leftJoinAndSelect('course.createdBy', 'createdBy')
            .where('courseTopic.courseId = :courseId', {
                courseId,
            })
            .orderBy('courseTopic.sequence', 'ASC')
            .select('courseTopic.id')
            .addSelect('courseTopic.name')
            .addSelect('courseTopic.sequence')
            .addSelect('courseTopic.createdAt')
            .addSelect('course.id')
            .addSelect('course.name')
            .addSelect('course.price')
            .addSelect('course.imageUrl')
            .addSelect('createdBy.username')
            .getMany();
        return topicList;
    }
    async getContentListByTopicId(dto: FindContentListDTO) {
        const { topicId } = dto;
        const contentList = await CourseContent.find({
            where: { topicId: topicId },
            relations: ['topic'],
            order: {
                sequence: 'ASC',
            },
        });
        return contentList;
    }
    async addToCart(dto: AddToCartDTO) {
        const { courseId, userId } = dto;
        console.log(dto);
        const user = await User.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new Error('No user found');
        }
        const course = await Course.findOne({
            where: { id: courseId },
        });
        if (!course) {
            throw new Error('No course found');
        }
        const cart = await Cart.findOne({ where: { user: { id: userId } } });
        if (cart) {
            const courses: Course[] = cart.courses ? cart.courses : [];
            courses.push(course);
            cart.user = user;
            cart.courses = courses;
            await cart.save();
            return cart;
        } else {
            const cart = new Cart();
            cart.user = user;
            cart.courses = [course];
            await cart.save();
        }
    }
    async getCourseListByCartId(dto: FindCourseDTO) {
        const { cartId } = dto;
        const courseList = await Course.find({
            where: { cart: { id: cartId } },
        });
        return courseList;
    }
}

export default new CourseService();
