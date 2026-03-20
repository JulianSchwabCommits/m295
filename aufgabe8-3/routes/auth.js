import express from 'express';
import * as authController from '../controller/auth.js';

const router = express.Router();

router.post('/login', authController.login);
router.get('/verify', authController.verify);
router.delete('/logout', authController.logout);

export default router;
