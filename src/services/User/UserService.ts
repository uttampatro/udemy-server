import { User } from '../../entity/User';
import { SaveUserDTO } from './UserDTO';

class UserService {
    async login(dto: SaveUserDTO) {
        const { email, password } = dto;
        const user = await User.findOne({
            where: { email, password },
            select: ['id', 'username', 'email'],
        });
        return user;
    }
    async findUsers() {
        const users = await User.find();
        return users;
    }
}

export default new UserService();
