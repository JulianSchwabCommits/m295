import express from 'express';
import * as lendController from '../controller/lend.js';

const router = express.Router();

router.get('/', lendController.getAllLends);
router.get('/:id', lendController.getLendById);
router.post('/', lendController.createLend);
router.delete('/:id', lendController.deleteLend);

export default router;
