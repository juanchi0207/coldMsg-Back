// controllers/messageController.ts
import { Request, Response, NextFunction } from 'express';
import { MessageService } from '../services/messageService';
import { OpenAIMessageGenerator, OpenAIProfileSummarizer } from '../adapters/openaiAdapter';
import { DummyLinkedInFetcher } from '../adapters/linkedinAdapter';
import { ProfileSummarizerService } from '../services/profileSummarizer';

const service = new MessageService(
  new OpenAIMessageGenerator(),
  new DummyLinkedInFetcher(),
  new ProfileSummarizerService(new OpenAIProfileSummarizer())
);

export const generateMessagesController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { senderProfile, recipientProfile, problem, solution, category } = req.body;
    if (!senderProfile || !recipientProfile || !problem || !solution || !category) {
      res.status(400).json({ error: 'Faltan campos requeridos' });
      return;
    }

    const messages = await service.generate(
      senderProfile,
      recipientProfile,
      problem,
      solution,
      category
    );
    res.json({ messages });
  } catch (err) {
    next(err);  // pasa el error al middleware de errores
  }
};