import { Request, Response } from 'express';
import { MessageService } from '../services/messageService';
import { OpenAIMessageGenerator } from '../adapters/openaiAdapter';
import { DummyLinkedInFetcher } from '../adapters/linkedinAdapter';

const service = new MessageService(new OpenAIMessageGenerator(), new DummyLinkedInFetcher());

export const generateMessagesController = async (req: Request, res: Response) => {
  try {
    const { senderProfile, recipientProfile, problem, solution } = req.body;
    if (!senderProfile || !recipientProfile || !problem || !solution) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const messages = await service.generate(senderProfile, recipientProfile, problem, solution);
    res.json({ messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
};
