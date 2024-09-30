import UserModel from "../database/models/User/User";
import type { IUserByPage, IUser } from "../types/IUser";

class UserService {
    async craeteNewUser(telegramId: number, username: string) {
        try {
            const isInDb = await UserModel.findOne({ where: { telegramId } });
            if (!isInDb) {
                const res = await UserModel.create({ telegramId, username });
                return res;
            }
            return isInDb;
        } catch (err) {
            console.error(err);
        }
    }
    async getUser(telegramId: number) {
        try {
            const user = await UserModel.findOne({ where: { telegramId } });
            return user;
        } catch (err) {
            console.error(err);
        }
    }
    async getUserByPage(currentPage: number): Promise<IUserByPage | undefined> {
        try {
            const count: number = 5;
            const offset = (currentPage - 1) * count;
            const totalUsers = await UserModel.count();
            const totalPages = Math.ceil(totalUsers / count);

            const users: IUser[] = [];
            await UserModel.findAll({
                offset,
                limit: count,
                order: [['id', 'DESC']]
            }).then(items => {
                items.forEach(item => {
                    const { id, telegramId, username } = item.dataValues;
                    let user: IUser = { id, telegramId, username };
                    users.push(user);
                })
            });

            const res: IUserByPage = {
                totalPages,
                currentPage,
                users
            }
            return res;
        } catch (err) {
            console.error(err);
        }
    }
}

export default new UserService;