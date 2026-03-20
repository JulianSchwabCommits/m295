import express from 'express';
import * as controller from '../controller/auth.js';

const router = express.Router();

router.post('/login', controller.login);
router.get('/verify', controller.verify);
router.delete('/logout', controller.logout);

export default router;
