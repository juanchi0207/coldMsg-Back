import { Configuration, OpenAIApi } from 'openai';
import { IMessageGenerator } from '../interfaces/IMessageGenerator';

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

export class OpenAIMessageGenerator implements IMessageGenerator {
  async generateMessages(prompt: string): Promise<string[]> {
    const res = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      n: 3,
      temperature: 0.7
    });

    return res.data.choices.map(c => c.message?.content?.trim() || '');
  }
}
