import OpenAI from 'openai';
import { IMessageGenerator } from '../interfaces/IMessageGenerator';

// Instancia el cliente
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export class OpenAIMessageGenerator implements IMessageGenerator {
  async generateMessages(prompt: string): Promise<string[]> {
    const res = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      n: 3,
      temperature: 0.7
    });

    return res.choices.map(c =>
      // Si content es null o undefined, cae al string vacío, luego trim()//
      (c.message?.content ?? '').trim()
    );
  }
}
