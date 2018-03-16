import ensureAuth from './app/passport/ensure-authenticated';
import AuthController from './app/Controllers/authController';
import express, {Request, Response} from 'express';
let router = express.Router();

router.get('/api/register', AuthController.getRegister);

router.post('/api/register',
  AuthController.register);

router.get('/api/login',
  AuthController.getLogin);

router.post('/api/login',
  AuthController.login);

router.get('/api/logout',
  ensureAuth,
  AuthController.logout);

router.get('/api/forgot-password',
  ensureAuth,
  AuthController.getForgotPassword);

export default router;
