// controllers/messageController.ts
import { Request, Response, NextFunction } from 'express';
import { MessageService } from '../services/messageService';
import { OpenAIgetCaracteristics, OpenAIMessageGenerator, OpenAIProfileSummarizer } from '../adapters/openaiAdapter';
import { LinkedinFetcher } from '../adapters/linkedinAdapter';
import { ProfileSummarizerService } from '../services/profileSummarizer';
import { ProfileCharacteristicsService } from '../services/characteristicsService';

const service = new MessageService(
  new OpenAIMessageGenerator(),
  new LinkedinFetcher(),
  new ProfileSummarizerService(new OpenAIProfileSummarizer()),
  new ProfileCharacteristicsService(new OpenAIgetCaracteristics())
);

export const generateMessagesController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    /*
    const { senderProfile, recipientProfile, problem, solution, category } = req.body;
    if (!senderProfile || !recipientProfile || !problem || !solution || !category) {
      res.status(400).json({ error: 'Faltan campos requeridos' });
      return;
    }*/
    const { senderProfile, recipientProfile, problem, solution } = req.body;
    if (!senderProfile || !recipientProfile || !problem || !solution ) {
      res.status(400).json({ error: 'Faltan campos requeridos' });
      return;
    }

    const messages = await service.generate(
      senderProfile,
      recipientProfile,
      problem,
      solution
      //category
    );
    res.json({ messages });
  } catch (err) {
    next(err);  // pasa el error al middleware de errores
  }
};