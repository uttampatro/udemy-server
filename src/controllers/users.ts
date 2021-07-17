import { Request, Response } from 'express';
import { get } from 'lodash';
import { UserService } from '../services';

class UserController {
    fetchUserProfile = async (req: Request, res: Response) => {
        try {
            const users = await UserService.findUsers();
            return res.json(users);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
            });
        }
    };

    loginUser = async (req: Request, res: Response) => {
        try {
            const email = get(req, 'body.email');
            const password = get(req, 'body.password');
            const user = await UserService.login({ email, password });
            if (!user) {
                return res.status(404).send('');
            }
            return res.send(user);
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    };
}

export default new UserController();
