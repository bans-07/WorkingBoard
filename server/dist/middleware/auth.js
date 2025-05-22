// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
import { User } from '../models/user'; // Corrected path (no .js, match actual filename)
import dotenv from 'dotenv';
dotenv.config(); // Load .env variables
export const login = async (req, res) => {
    const { username } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        return res.status(200).json({ message: 'Login successful (password validation omitted for brevity)' });
    }
    catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Server error during login' });
    }
};
// src/middleware/auth.ts
export const authenticateToken = ( /* ... */) => { };
