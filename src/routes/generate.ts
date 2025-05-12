import { Router } from 'express';
import { generateMessagesController } from '../controllers/messageController';

const router = Router();
router.post('/', generateMessagesController);
export default router;
