import express from 'express';
import * as bookController from '../controller/book.js';

const router = express.Router();

router.get('/', bookController.getAllBooks);
router.get('/:isbn', bookController.getBookById);
router.post('/', bookController.createBook);
router.put('/:isbn', bookController.updateBook);
router.delete('/:isbn', bookController.deleteBook);
router.patch('/:isbn', bookController.patchBook);

export default router;
