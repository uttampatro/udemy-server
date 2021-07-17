import { User } from '../../entity/User';
import { Course } from '../../entity/Course';
import {
    AddToCartDTO,
    CreateCourseContentDTO,
    CreateCourseDTO,
    CreateTopicDTO,
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
        const { name, courseId, userId } = dto;
        const user = await User.findOne({
            where: { id: userId },
        });
        const course = await Course.findOne({
            where: { id: courseId },
        });
        const topic = new CourseTopic();
        topic.name = name;
        topic.createdBy = user!;
        topic.courseId = courseId;
        topic.course = course!;
        await topic.save();
        return topic;
    }
    async createCourseContent(dto: CreateCourseContentDTO) {
        const { content, topicId, userId } = dto;
        const user = await User.findOne({
            where: { id: userId },
        });
        const topic = await CourseTopic.findOne({
            where: { id: topicId },
        });
        const courseContent = new CourseContent();
        courseContent.content = content;
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
    async getTopicListByCourseId(dto: FindTopicListDTO) {
        const { courseId } = dto;
        const topicList = await CourseTopic.find({
            where: { courseId: courseId },
        });
        return topicList;
    }
    async addToCart(dto: AddToCartDTO) {
        const { courseId, userId } = dto;
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
            await Cart.update({ id: cart.id }, { courses: courses });
        } else {
            const cart = new Cart();
            cart.user = user;
            cart.courses = [course];
            await cart.save();
        }
    }
    async getCourseListByCartId() {}
}

export default new CourseService();
