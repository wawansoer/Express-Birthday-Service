import { Model, DataTypes } from 'sequelize';
import sequelize from '../Configs/SequelizeConfig';
/**
 * Represents a user in the database.
 * 
 * This class provides a blueprint for creating user objects and mapping them to database records.
 */
class User extends Model {
    /**
     * The unique identifier for the user.
     */
    public id!: number;

    /**
     * The email address of the user.
     */
    public email!: string;

    /**
     * The first name of the user.
     */
    public first_name!: string;

    /**
     * The last name of the user.
     */
    public last_name!: string;

    /**
     * The date of birth of the user.
     */
    public birthday_date!: Date;

    /**
     * The timezone of the user.
     */
    public timezone!: string;

    /**
     * The location of the user.
     */
    public location!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthday_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        timezone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'UserModel',
        tableName: 'Users',
        timestamps: false
    }
);

export default User;
