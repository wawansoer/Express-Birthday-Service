/**
 * This code snippet defines a UserController that handles HTTP requests related to user management.
 * It uses the UserService to perform CRUD operations on users.
*/

import { Request, Response } from 'express';
import UserService from '../Services/UserService';

const UserController = {

    /**
     * Adds a new user.
     * 
     * @param req - The HTTP request containing user data.
     * @param res - The HTTP response.
     * @returns A JSON response with the created user data.
    */
    async addUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, first_name, last_name, birthday_date, timezone, location } = req.body;
            const user = await UserService.addUser({
                email,
                first_name,
                last_name,
                birthday_date,
                timezone,
                location
            });
            res.status(201).json({
                code: 201,
                message: "Success created user",
                data: user
            });
        } catch (error) {
            console.error(error)
            res.status(500).json({
                code: 500,
                message: 'Failed to add user.',
                data: error
            });
        }
    },

    /**
     * Updates an existing user.
     * 
     * @param req - The HTTP request containing user data and the user ID.
     * @param res - The HTTP response.
     * @returns A JSON response with the updated user data.
    */
    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.id);
            const { email, first_name, last_name, birthday_date, timezone, location } = req.body;

            const updatedUser = await UserService.updateUser(userId, {
                email,
                first_name,
                last_name,
                birthday_date,
                timezone,
                location
            });

            if (!updatedUser) {
                res.status(404).json({ message: 'User not found.' });
            } else {
                res.status(200).json({
                    code: 200,
                    message: 'User details updated successfully.',
                    data: updatedUser
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ code: 500, message: 'Failed to update user.', data: error });
        }
    },

    /**
     * Removes a user.
     * 
     * @param req - The HTTP request containing the user ID.
     * @param res - The HTTP response.
     * @returns A JSON response indicating the success of the operation.
    */
    async removeUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.id);
            await UserService.removeUser(userId);
            res.status(200).json({ message: 'User removed successfully.' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to remove user.' });
        }
    }
}

export default UserController;