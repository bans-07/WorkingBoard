// src/routes/auth-routes.ts
import { Router, Request, Response } from 'express';
import { User } from '../models/user.js'; // ✅ Corrected path (no .js, match actual filename)
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      // Path 1: User not found
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // No need for a redundant `if (user)` block here, as `!user` is handled above.
    // The code simply proceeds if `user` is found.

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // Path 2: User found, but password is NOT valid
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Path 3: User found AND Password IS valid.
    // This is the successful login path where you generate and send the JWT.

    // Ensure JWT_SECRET is defined before using it
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET environment variable is not defined.');
      // Return a server error if critical config is missing
      return res.status(500).json({ message: 'Server configuration error.' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username }, // Payload for the JWT
      process.env.JWT_SECRET, // Your secret key
      { expiresIn: '1h' } // Token expiration time
    );

    // Return the token upon successful login
    return res.json({ token }); // ✅ This is the missing return statement!

  } catch (error) {
    // Path 4: Any unexpected error during the process
    console.error('Login error:', error);
    // Return a 500 error for server issues
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const router = Router();

router.post('/login', login);

export default router;


// import { Router, Request, Response } from 'express';
// import { User } from '../models/user.js';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';

// export const login = async (req: Request, res: Response) => {
//   // TODO: If the user exists and the password is correct, return a JWT token
// };

// const router = Router();

// // POST /login - Login a user
// router.post('/login', login);

// export default router;
