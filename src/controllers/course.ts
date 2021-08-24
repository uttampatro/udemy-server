import { Request, Response } from 'express';
import { get } from 'lodash';
import { CourseService } from '../services';

class CourseController {
    createCourse = async (req: Request, res: Response) => {
        try {
            const userId = req.body.userId;
            const imageUrl = req.body.imageUrl;
            const name = req.body.name;
            const price = req.body.price;
            const course = await CourseService.createCourse({
                userId,
                imageUrl,
                name,
                price,
            });
            return res.json(course);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
            });
        }
    };
    createTopic = async (req: Request, res: Response) => {
        try {
            const userId = req.body.userId;
            const name = req.body.name;
            const courseId = req.body.courseId;
            const topic = await CourseService.createTopic({
                name,
                courseId,
                userId,
            });
            return res.json(topic);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
            });
        }
    };
    createCourseContent = async (req: Request, res: Response) => {
        try {
            const userId = req.body.userId;
            const content = req.body.content;
            const topicId = req.body.topicId;
            const courseContent = await CourseService.createCourseContent({
                userId,
                content,
                topicId,
            });
            return res.json(courseContent);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
            });
        }
    };
    getAllCourseList = async (req: Request, res: Response) => {
        try {
            const courseList = await CourseService.getAllCourseList();
            return res.json(courseList);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
            });
        }
    };
    getCourse = async (req: Request, res: Response) => {
        try {
            const courseId = req.params.id;
            const course = await CourseService.getCourse({
                courseId,
            });
            return res.json(course);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
            });
        }
    };
    getTopicListByCourseId = async (req: Request, res: Response) => {
        try {
            const courseId = req.params.id;
            const topicList = await CourseService.getTopicListByCourseId({
                courseId,
            });
            return res.json(topicList);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
            });
        }
    };
    getContentListByTopicId = async (req: Request, res: Response) => {
        try {
            const topicId = req.params.id;
            const contentList = await CourseService.getContentListByTopicId({
                topicId,
            });
            return res.json(contentList);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
            });
        }
    };
    addToCart = async (req: Request, res: Response) => {
        try {
            const userId = req.body.userId;
            const courseId = req.body.courseId;
            const cart = await CourseService.addToCart({
                userId,
                courseId,
            });
            return res.json(cart);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
            });
        }
    };
    getCourseListByCartId = async (req: Request, res: Response) => {
        try {
            const cartId = req.params.id;
            const courseList = await CourseService.getCourseListByCartId({
                cartId,
            });
            return res.json(courseList);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
            });
        }
    };
}

export default new CourseController();
