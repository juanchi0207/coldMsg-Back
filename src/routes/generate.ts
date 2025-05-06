import { Router, Request, Response } from 'express';
import { generateMessagesController } from '../controllers/messageController';

const router = Router();
router.post('/', generateMessagesController);
export default router;
