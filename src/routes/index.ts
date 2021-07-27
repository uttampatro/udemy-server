import express, { Router, Request, Response } from 'express';
import UserController from '../controllers/users';
import CourseController from '../controllers/course';

const router: Router = express.Router();

router.get('/', (_req: Request, res: Response) => {
    res.send('server up and running');
});

// User controller
router.get('/users', UserController.fetchUserProfile);
router.post('/login', UserController.loginUser);

//Course controller
router.post('/createCourse', CourseController.createCourse);
router.post('/createTopic', CourseController.createTopic);
router.post('/createCourseContent', CourseController.createCourseContent);
router.get('/getAllCourseList', CourseController.getAllCourseList);
router.get('/getTopicList/:id', CourseController.getTopicListByCourseId);
router.post('/addToCart', CourseController.addToCart);
router.get('/getCourseList/:id', CourseController.getCourseListByCartId);

export default router;
