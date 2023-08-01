import Task from '../Models/TaskModel'
import UserService from './UserService';
/**
 * TaskService class provides functionalities for managing tasks related to sending birthday messages to users.
 */
class TaskServie {
    /**
     * Creates a new task for each user with a birthday at 9 AM and logs the task details.
     */
    async addTask() {
        try {
            const Users = await UserService.getUsersWithBirthdayAt9AM()
            for (const User of Users) {
                const { email, first_name, last_name, } = User.dataValues;
                const newTask = await Task.create({
                    email: email,
                    message: `Hey, ${first_name}  ${last_name} it’s your birthday`,
                    sent: false,
                });
                console.log('New task created:', newTask.toJSON());
            }
        } catch (error) {
            console.error('Failed to save task data');
        }
    }

    /**
     * Fetches all unsent tasks from the database.
     * @returns {Task[]} - Array of unsent tasks
     */
    async getUnsentTasks() {
        try {
            const unsentTasks = await Task.findAll({
                where: {
                    sent: false,
                },
                order: [['createdAt', 'ASC']],
            });
            return unsentTasks
        } catch (error) {
            console.error('Error fetching unsent tasks:', error);
            return null
        }
    }

    /**
     * Marks a task as sent by its ID.
     * @param {number} taskId - ID of the task to mark as sent
     */
    async markTaskAsSentById(taskId: number) {
        try {
            // Find the task by its ID
            const task = await Task.findByPk(taskId);

            if (!task) {
                console.log(`Task with ID ${taskId} not found.`);
                return;
            }

            // Update the 'sent' field to true
            task.sent = true;
            await task.save(); // Save the updated record back to the database

            console.log(`Task with ID ${taskId} marked as sent.`);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }
}

export default new TaskServie();

