/**
 * This code snippet defines the routes for user-related operations in an Express application.
 * It uses the UserController to handle the logic for adding, updating, and removing users.
 * The routes also include validation middleware using the AddUserValidator and UpdateUserValidator.
 */

import express from 'express';
import UserController from '../Controllers/UserController';
import { validate, AddUserValidator, UpdateUserValidator } from '../Validators';

const router = express.Router();

// GET route for the root path
router.get('/', (req, res) => {
    res.json({ message: 'This is Express ' });
});

// POST route for adding a user, with validation middleware
router.post('/user', validate(AddUserValidator), UserController.addUser);

// DELETE route for removing a user
router.delete('/user/:id', UserController.removeUser);

// PUT route for updating a user, with validation middleware
router.put('/user/:id', validate(UpdateUserValidator), UserController.updateUser);

export default router;