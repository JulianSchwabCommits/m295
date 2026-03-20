import express from 'express';
import * as auth from '../controller/auth.js';

const router = express.Router();

router.post('/login', auth.login);
router.get('/verify', auth.verify);
router.delete('/logout', auth.logout);

export default router;
