/**
 * This code snippet defines a Sequelize model for a Task entity with its attributes and data types.
 * It also initializes the model with the Sequelize instance created in the SequelizeConfig file.
*/
import { Model, DataTypes } from 'sequelize';
import sequelize from '../Configs/SequelizeConfig';

/**
 * Represents a task to be executed.
 * 
 * This class is a Sequelize model that defines the schema of the Task table in the database.
 * It provides methods for creating, updating, and querying tasks.
 */
class Task extends Model {
    /**
     * The unique identifier of the task.
     */
    public id!: number;

    /**
     * The email address associated with the task.
     */
    public email!: string;

    /**
     * The message to be sent as part of the task.
     */
    public message!: string;

    /**
     * Indicates whether the task has been sent or not.
     */
    public sent!: boolean;

    /**
     * The timestamp when the task was created.
     */
    public createdAt!: Date;

    /**
     * The timestamp when the task was last updated.
     */
    public updatedAt!: Date;
}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sent: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: 'TaskModel',
        tableName: 'Task',
    }
);

export default Task;