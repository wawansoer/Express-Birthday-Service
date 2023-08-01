import dotenv from 'dotenv';
import express from 'express';
import cron from 'node-cron';
import router from './Routers';
import sequelize from './Configs/SequelizeConfig';
import User from './Models/UserModel';
import Task from './Models/TaskModel';
import SendEmailService from './Services/SendEmailService';
import TaskService from './Services/TaskService';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/', router);

/**
 * The main function is responsible for authenticating the connection to the database and creating the necessary tables.
 * If the FORCE_MIGRATE environment variable is set to "True", it drops the existing tables and creates new ones.
 * 
 * @returns {Promise<void>} A promise that resolves when the function completes.
 */
async function main(): Promise<void> {
    try {
        // Authenticate the connection to the database
        await sequelize.authenticate();
        console.timeStamp("Connected to database");

        // Check if FORCE_MIGRATE environment variable is set to "True"
        let migrate = false;
        if (process.env.FORCE_MIGRATE === "True") {
            migrate = true;
            // Drop existing tables and create new ones
            await User.sync({ force: migrate });
            await Task.sync({ force: migrate });
            console.info("Successfully created tables (check on app.ts)");
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();


/**
 * Schedule a cron job to add a task for users who have their birthday at 9 AM on their local time.
 * The cron job runs every 30 minutes.
 */
cron.schedule('*/30 * * * *', async () => {
    console.timeStamp("Run Cron To Get a User Who has birthday 9AM on their localtime");
    await TaskService.addTask();
});

/**
 * Function to run a cron job every 30 seconds to send birthday emails to users who have not yet received them.
 * It retrieves a list of unsent tasks using the TaskService and sends emails to the users using the SendEmailService.
 */
cron.schedule('*/30 * * * * *', async () => {
    console.timeStamp("Run Cron Sent Email To User");
    const data = await TaskService.getUnsentTasks();

    await SendEmailService(data)
});

export default app;
