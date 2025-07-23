import Router from 'express';
import { loginUser, registerUser } from '../controllers/authControllers.js';

const AuthRouter = Router();

AuthRouter.post('/login',loginUser);

AuthRouter.post('/register',registerUser);

export default AuthRouter;