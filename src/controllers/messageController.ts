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

const linkedInPattern = /^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/;

export const generateMessagesController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Validar que los campos requeridos estén presentes
    const {idioma, senderProfile, recipientProfile, problem, solution } = req.body;
    if (!idioma || !senderProfile || !recipientProfile || !problem || !solution ) {
      res.status(400).json({ error: 'Faltan campos requeridos' });
      return;
    }

    if (!linkedInPattern.test(senderProfile) || !linkedInPattern.test(recipientProfile)) {
      res.status(400).json({ error: 'URLs de LinkedIn inválidas' });
      return;
    }

    const messages = await service.generate(
      idioma,
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