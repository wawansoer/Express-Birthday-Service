import sequelize from '../Configs/SequelizeConfig';
import { Op } from 'sequelize';
import User from '../Models/UserModel';
import { error } from 'console';

/**
 * The UserService class provides methods for managing user data in a database.
 */
class UserService {
    /**
     * Adds a new user to the database.
     * @param userInput - The user input data.
     * @returns A promise that resolves to the created user.
     */
    async addUser(userInput: {
        email: string;
        first_name: string;
        last_name: string;
        birthday_date: Date;
        timezone: string;
        location: string;
    }): Promise<User> {
        return User.create(userInput);
    }

    /**
     * Removes a user from the database by their ID.
     * @param id - The ID of the user to remove.
     * @returns A promise that resolves when the user is successfully removed.
     * @throws An error if the user is not found.
     */
    async removeUser(id: number): Promise<void> {
        const user = await User.findOne({ where: { id: id } });

        if (!user) {
            throw error;
        }

        await User.destroy({ where: { id } });
    }

    /**
     * Updates a user's data in the database by their ID.
     * @param userId - The ID of the user to update.
     * @param updatedUserData - The updated user data.
     * @returns A promise that resolves to the updated user, or null if the user is not found.
     * @throws An error if there is an issue updating the user.
     */
    async updateUser(userId: number, updatedUserData: {
        email?: string;
        first_name?: string;
        last_name?: string;
        birthday_date?: Date;
        timezone?: string;
        location?: string;
    }): Promise<User | null> {
        try {
            const user = await User.findOne({ where: { id: userId } });

            if (!user) {
                return null;
            }

            await user.update(updatedUserData);

            return user;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves users from the database whose birthday is at 9 AM in their timezone.
     * @returns A promise that resolves to an array of users.
     * @throws An error if there is an issue executing the query.
     */
    async getUsersWithBirthdayAt9AM() {
        try {
            const users = await User.findAll({
                attributes: ['email', 'first_name', 'last_name', 'birthday_date', 'timezone', 'location'],
                where: {
                    [Op.and]: [
                        sequelize.literal(`EXTRACT(HOUR FROM NOW() AT TIME ZONE "timezone") = 8`),
                        sequelize.literal(`EXTRACT(MINUTE FROM NOW() AT TIME ZONE "timezone") BETWEEN 55 AND 65`),
                        sequelize.literal(`DATE_PART('month', NOW() AT TIME ZONE "timezone") = DATE_PART('month', "birthday_date" AT TIME ZONE "timezone")`),
                        sequelize.literal(`DATE_PART('day', NOW() AT TIME ZONE "timezone") = DATE_PART('day', "birthday_date" AT TIME ZONE "timezone")`),
                    ],
                },
            });

            return users;
        } catch (error) {
            console.error('Error executing query:', error);
            return [];
        }
    }
}

export default new UserService();
