import express from 'express';
import * as lendController from '../controller/lend.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', lendController.getAllLends);
router.get('/:id', lendController.getLendById);
router.post('/', requireAuth, lendController.createLend);
router.delete('/:id', requireAuth, lendController.deleteLend);

export default router;
