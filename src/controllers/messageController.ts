// controllers/messageController.ts
import { Request, Response, NextFunction } from 'express';
import { MessageService } from '../services/messageService';
import { OpenAIMessageGenerator } from '../adapters/openaiAdapter';
import { DummyLinkedInFetcher } from '../adapters/linkedinAdapter';

const service = new MessageService(
  new OpenAIMessageGenerator(),
  new DummyLinkedInFetcher()
);

export const generateMessagesController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { senderProfile, recipientProfile, problem, solution } = req.body;
    if (!senderProfile || !recipientProfile || !problem || !solution) {
      res.status(400).json({ error: 'Faltan campos requeridos' });
      return;
    }

    const messages = await service.generate(
      senderProfile,
      recipientProfile,
      problem,
      solution
    );
    res.json({ messages });
  } catch (err) {
    next(err);  // pasa el error al middleware de errores
  }
};
