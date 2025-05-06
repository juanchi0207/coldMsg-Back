import { IMessageGenerator } from '../interfaces/IMessageGenerator';
import { IProfileFetcher } from '../interfaces/IProfileFetcher';

export class MessageService {
  constructor(
    private readonly generator: IMessageGenerator,
    private readonly fetcher: IProfileFetcher
  ) {}

  async generate(senderUrl: string, recipientUrl: string, problem: string, solution: string): Promise<string[]> {
    const senderInfo = await this.fetcher.fetchProfile(senderUrl);
    const recipientInfo = await this.fetcher.fetchProfile(recipientUrl);

    const prompt = `
El emisor es: ${senderInfo}
El receptor es: ${recipientInfo}
Problema: ${problem}
Solución: ${solution}

Generá 3 icebreakers breves, humanos, personalizados y de tono natural.
`;

    return await this.generator.generateMessages(prompt);
  }
}
